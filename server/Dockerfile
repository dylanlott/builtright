FROM node:7
COPY ./ /app
WORKDIR /app 
RUN npm install
EXPOSE 3000
VOLUME ["/app"]
CMD ["node", "index.js"]
