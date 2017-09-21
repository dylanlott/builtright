# vue-webpack

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Starting Docker Image

Build the image
`$ docker build -t hivemindapps/builtright-nginx:latest .`

Run it from local or server
`$ docker run --name builtright-nginx -p 8084:80 -d hivemindapps/builtright-nginx:latest`

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
