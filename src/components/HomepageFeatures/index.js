import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [{
  title: 'Reglamento de Estilo de Código',
  Svg: require('@site/static/img/Resume-folder-bro.svg').default,
  description: ( <
      >
    El lugar perfecto para aprender nuestro estándar de programación, reglas de código y estructura de nuestras aplicaciones. <
      />
    ),
  },
    {
      title: 'Guías prácticas',
    Svg: require('@site/static/img/Creative-thinking-bro.svg').default,
    description: ( <
      >
      Encuentra ejemplos concretos y casos de estudio que te guiarán en la implementación de tus proyectos en Avila Tek. <
      />
      ),
  },
      {
        title: 'Cut the crap',
      Svg: require('@site/static/img/Code-snippets-bro.svg').default,
      description: ( <
      >
        Olvídate de largas y tediosas explicaciones. Esta guía va al grano, presentando los conceptos clave de la arquitectura limpia de forma clara, concisa y fácil de digerir.
        <
      />
        ),
  },
        ];

        function Feature({
          Svg,
          title,
          description
        }) {
  return ( <
    div className={
            clsx('col col--4')
          } >
          <
    div className="text--center" >
            <
              Svg className={
                styles.featureSvg
              }
              role="img" />
            <
    /div> <
    div className="text--center padding-horiz--md" >
              <
    Heading as="h3" > {
                  title
                } < /Heading> <
    p > {
                    description
                  } < /p> <
    /div> <
    /div>
                  );
}

                  export default function HomepageFeatures() {
  return ( <
    section className={
                      styles.features
                    } >
                    <
    div className="container" >
                      <
    div className="row" > {
                          FeatureList.map((props, idx) => (<
                            Feature key={
                              idx
                            } {
                            ...props
                            }
                          />
                          ))
                        } <
    /div> <
    /div> <
    /section>
                        );
}