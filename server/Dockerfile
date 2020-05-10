# stage 1
FROM node:10 
WORKDIR /app
COPY package.json /app

COPY . /
RUN npm install
CMD node index.js
EXPOSE 5001


