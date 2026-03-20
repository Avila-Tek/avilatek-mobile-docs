---
slug: /frontend/fetch/queries
title: Query
sidebar_position: 3
---

## API del feature
Esta es la API de nuestro feature, debemos declarar cuáles son las consultas a las que tendremos acceso.

```tsx
// 📁 .../src/feature/userManagement/infrastructure/userManagement.interfaces.ts
import type {
  TCreateUserInput,
  TPagination,
  TPaginationInput,
  TUser,
} from '@repo/schemas';
import type { Safe } from '@repo/utils';

// aca hay queries y mutaciones
export interface UserApi {
  pagination(input: TPaginationInput): Promise<Safe<TPagination<TUser>>>;
}
```

## Servicio
En el servicio tendremos la responsabilidad de hacer los parseos del dominio de nuestro feature, hacia el de la API o viceversa.

```ts
// 📁 .../src/feature/userManagement/infrastructure/userManagement.service.ts
import type { TCreateUserInput, TPaginationInput } from '@repo/schemas';
import type { PaginatedUsers, User } from '../domain/user.model';
import type { UserApi } from './userManagement.interfaces';
import { toPaginatedUsers, toUserDomain } from './userManagement.transform';

export class UserManagementService {
  constructor(private api: UserApi) {}

  async allUsersPagination(input: TPaginationInput): Promise<PaginatedUsers> {
    const result = await this.api.pagination(input);
    if (!result.success) {
      throw new Error(result.error);
    }
    return toPaginatedUsers(result.data);
  }
}
```

## Instancia del servicio

```ts
// 📁 .../src/feature/userManagement/infrastructure/index.ts
import { getAPIClient } from '@/src/lib/api';
import { UserManagementService } from './userManagement.service';

const api = getAPIClient();
export const userManagementService = new UserManagementService(api.v1.users);
```

## Exportar query options

```ts
// 📁 .../src/feature/userManagement/application/userManagement.query.ts
import type { TPaginationInput } from '@repo/schemas';
import { queryOptions } from '@tanstack/react-query';
import { userManagementService } from '../../infrastructure';

export const usersQueryKeys = {
  pagination: (params: TPaginationInput) =>
    ['pagination', params] as const,
};

export function usersPaginationQueryOptions({
  page,
  perPage,
}: TPaginationInput) {
  return queryOptions({
    queryKey: usersQueryKeys.pagination({ page, perPage }),
    queryFn: () => userManagementService.allUsersPagination({ page, perPage }),
  });
}
```

## Queries

### Server side

Primero realizaremos un prefetching de los datos que deseamos desde el servidor; esto cargará nuestro caché con la respuesta de la consulta deseada.

```tsx
// 📁 ../app/users/page.tsx
import { paginationInputSchema } from '@repo/schemas';
import React from 'react';
import z from 'zod';
import { getQueryClient } from '@/src/lib/get-query-client';
import { usersPaginationQueryOptions } from '@/src/features/userManagement/application/queries/userManagement.query';
import { UsersQuery } from './users-query';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const qs = await searchParams;
  const queryClient = getQueryClient();
  const parsed = paginationInputSchema.safeParse(qs);
  if (!parsed.success) {
    return (
      <p className="error">
        Error parsing params {z.prettifyError(parsed.error)}
      </p>
    );
  }
  void queryClient.prefetchQuery(
    usersPaginationQueryOptions({
      page: parsed.data.page,
      perPage: parsed.data.perPage,
    }),
  );
  return <UsersQuery page={parsed.data.page} perPage={parsed.data.perPage} />;
}
```

<p align="right"><small>- Al hacer un prefetching, la data "Viajará" a nuestros queries en client-side 😊</small></p>

Y ahora procedemos a leer la data del cache sin problema alguno, para ello hacemos uso de useSuspenseQuery (también podríamos haber hecho uso de useQuery).

```tsx
// 📁 apps\client\src\app\users\users-query.tsx
'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { usersPaginationQueryOptions } from '@/src/features/userManagement/application/queries/userManagement.query';


export function UsersQuery({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) {
  const query = useSuspenseQuery(usersPaginationQueryOptions({ page, perPage }));
  if (query.error) {
    <p className="error">{query.error.message}</p>;
  }
  return <code>{JSON.stringify(query.data, null, 2)}</code>;
}
```

<p align="right"><small>- El prefetching funcionará siempre y cuando sus queryKeys sean iguales, en este ejemplo lo declaramos en el objeto userQueries 😜</small></p>

### Client side

Haremos uso de useQuery. Es importante mencionar que, si hiciéramos un prefetching desde el servidor de ciertos datos y se consultan en el cliente con useQuery, recibiríamos los datos de la caché, tal como en el caso de useSuspenseQuery. La diferencia entre ambas es cómo se gestiona el estado de carga (loading state).

```tsx
// 📁 apps\client\src\app\users\users-query.tsx
import { useQuery } from '@tanstack/react-query';
import { usersPaginationQueryOptions } from '@/src/features/userManagement/application/queries/userManagement.query';

const query = useQuery(usersPaginationQueryOptions({ page, perPage }));
```