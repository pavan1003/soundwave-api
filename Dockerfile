FROM node:21.6.0-alpine

WORKDIR /app

COPY package*.json ./

COPY firebase-credentials.json /firebase-credentials.json

RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
