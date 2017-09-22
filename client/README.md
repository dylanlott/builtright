# BuiltRight

> The project car build tracker and community forum website. 

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
`$ docker build -t hivemindapps/builtright-client:latest .`

Run it from local or server
`$ docker run --name builtright-nginx -p 8080:80 -d hivemindapps/builtright-nginx:latest`

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Production 

Build the app with `npm run dev`. 

Tag a new Docker image release with `docker build -t <repo>/<imagename>:<tag> and then push it up to docker hub.

Pull down using rancher or the docker cli, and then start it. By default, the Docker image will be on port 80. 

`API_URL` needs to be set to link correctly with Docker DNS resolution / networking. 