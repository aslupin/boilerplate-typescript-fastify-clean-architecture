FROM node:14.2
WORKDIR /home/api
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY . .
RUN ls -la
EXPOSE 8080

# Add dockerize
RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD ["npm", "run" ,"start:production"]