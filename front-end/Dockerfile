FROM node:18-slim


RUN mkdir -p /usr/videoask

WORKDIR /usr/videoask

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod 777 docker.sh

EXPOSE 3000

CMD ["./docker.sh"]