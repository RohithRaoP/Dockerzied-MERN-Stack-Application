FROM node:18

WORKDIR /app

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CDM ["npx", "serve", "-s", "build", "-1", "3000"]
