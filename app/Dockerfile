FROM node:lts-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app


COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]