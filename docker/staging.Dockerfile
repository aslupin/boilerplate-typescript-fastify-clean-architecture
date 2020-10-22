FROM node:14.3

WORKDIR /home/api

COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY . .
EXPOSE 8080

CMD ["npm", "run", "start:staging"]