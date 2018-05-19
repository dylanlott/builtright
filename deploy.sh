echo "PULLING LATEST CODE"
git pull http master
echo "INSTALLING CLIENT DEPENDENCIES"
cd client && npm install
echo "BULIDING CLIENT FILES"
npm run build
echo "CLIENT FILES SUCCESSFULLY BUNDLED"
echo "INSTALLING SERVER DEPENDENCIES"
cd ../server && npm install
cd ../
echo "RESTARTING DOCKER SERVER"
docker-compose up --build -d server
echo "RESTARTING CADDY SERVER"
systemctl restart caddy
echo "DEPLOY SUCCESSFUL"
