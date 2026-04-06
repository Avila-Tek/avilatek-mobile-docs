---
slug: /frontend/fetch/react-query
title: React Query
sidebar_position: 2
---

## Configuración

Configurar React Query consiste de los siguientes dos pasos:

### 1. Crear el client

```tsx
// 📁 apps/<app>/src/lib/get-query-client.ts
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
```

### 2. Instanciar el contexto

```tsx
// 📁 apps/<app>/src/context/client-providers.tsx
'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import type * as React from 'react';
import { getQueryClient } from '@/src/lib/get-query-client';

export function QueryClient({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```