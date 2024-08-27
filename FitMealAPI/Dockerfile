FROM node:20 AS base

FROM base AS depedencias
WORKDIR /src/app
COPY package.json  ./
RUN npm install

FROM base AS build
WORKDIR /src/app
COPY . .
COPY --from=depedencias /src/app/node_modules ./node_modules

# Mude aqui para npm run build
RUN npm run build
RUN npm prune --prod

FROM node:20-alpine3.20 AS deploy
WORKDIR /src/app
RUN npm i knex

COPY --from=build /src/app/dist ./dist
COPY --from=build /src/app/node_modules ./node_modules
COPY --from=build /src/app/package.json ./package.json
COPY --from=build /src/app/database ./database
COPY --from=build /src/app/src/database.ts ./database.ts

RUN npm run migrate

EXPOSE 3333

CMD ["node", "dist/server.js"]
