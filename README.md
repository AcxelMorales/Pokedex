<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p><p align="center">

# Ejecutar en desarrollo

1.- Clonar el repositorio

2.- Ejecutar
```
yarn install
```
3.- Tener nest CLI instalado
```
npm i -g @nestjs/cli
```
4.- Levantar la base de datos
```
docker-compose up -d
```
5.- Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6.- Llenar las variables de entorno definidas en el ```.env```

7.- Ejecutar la aplicación en dev
```
yarn start:dev
```

6.- Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

## Production build
1.- Crear el archivo ```.env.prod```

2.- Llenar las variables de entorno de prod

3.- Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Tecnologías
* MongoDB
* Nest
* Typescript
* HTML
* CSS
* Javascript

## Notas
Heroku redeploy sin cambios:
```
git commit --allow-empty -m "Trigger heroku deploy"
git push heroku <master|main>
```
