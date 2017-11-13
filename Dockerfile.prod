FROM node:8.0.0-alpine
RUN apk add --update nginx
RUN rm -rf /var/cache/apk/*
RUN mkdir -p /run/nginx
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/src/app
COPY ./dist /usr/src/app/
ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]
EXPOSE 80
