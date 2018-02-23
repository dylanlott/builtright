echo "PULLING LATEST CODE"
git pull http master
echo "INSTALLING CLIENT DEPENDENCIES"
cd client && npm install
echo "INSTALLING SERVER DEPENDENCIES"
cd ../server && npm install
cd ../
echo "RESTARTING DOCKER SERVER"
docker-compose up server --build
