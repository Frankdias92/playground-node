FROM node:20-alpine3.20 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine3.20 AS deploy

WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.env ./

EXPOSE 3333

# CMD ["node", "start"]
CMD ["sh", "-c", "npm run migrate && node dir/server.mjs"]
