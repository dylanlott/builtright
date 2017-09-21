# Builtright 

> A platform project for showing off your project cars.

## Stack 

Mongo, Node, VueJS

## Deployment

`$ docker build -t hivemindapps/builtright-server`

`$ docker push hivemindapps/builtright-server`

I use rancher to deploy my containers, but you could manually deploy with the docker-compose.yml file or the prod.docker-compose.yml file. 

Alternatively, you could use the flightplan.js deploy script that has been included to deploy without docker. 

## Roadmap 

- [ ] front end MVP 
- [ ] build timelines 
- [ ] SSL Termination 
