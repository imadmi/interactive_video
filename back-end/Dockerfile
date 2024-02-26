FROM node:21-alpine

RUN mkdir -p /usr/videoask

WORKDIR /usr/videoask

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod 777 docker.sh

EXPOSE 3001
EXPOSE 3002

CMD ["./docker.sh"]