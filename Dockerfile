# Dockerfile-frontend
FROM node:16.4 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "npx", "serve", "-s", "dist", "-l", "5000" ]