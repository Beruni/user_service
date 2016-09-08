FROM node:6.2.2
COPY ./dist/js/ /root/js/
COPY ./node_modules/ /root/node_modules/
WORKDIR /root/
EXPOSE 80
ENTRYPOINT PORT=80 node ./js/app.min.js