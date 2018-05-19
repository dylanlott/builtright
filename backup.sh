echo "### BACKING UP MONGO"
docker run -d \
    --net builtright_default \
    --link builtright_mongo_1:mongo \
    --env MONGODB_HOST=mongo \
    --env MONGODB_PORT=27017 \
    --env MONGODB_USER=dylanlott \
    --env MONGODB_PASS=r9pMQ2u2ZRjOLKzdWLFGzp7tyqx5PTsi \
    --env MAX_BACKUPS=10 \
    --env INIT_BACKUP=true \
    --volume /opt/builtright/backups:/backup \
    tutum/mongodb-backup
