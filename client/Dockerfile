FROM kyma/docker-nginx
COPY ./ /var/www/

ADD certs/server.crt /etc/nginx/ssl
ADD certs/server.key /etc/nginx/ssl 

RUN ln -s /etc/nginx/sites-available/default-ssl /etc/nginx/sites-enabled/default-ssl

ENV NODE_ENV=production
ENV SOCKET_IO=server:3000

CMD ["nginx"]
