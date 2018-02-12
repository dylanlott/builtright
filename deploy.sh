git pull origin master
cd client && npm install
cd ../server && npm install
cd ../
docker-compose up --build
