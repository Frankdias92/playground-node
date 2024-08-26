FROM node:alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3333

CMD ["tsc", "src/server.ts"]
# CMD ["sh", "-c", "npm run migrate && npm run start"]