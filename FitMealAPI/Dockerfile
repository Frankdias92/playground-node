# Etapa de construção
FROM node:20-alpine3.20 AS build

WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Executa o build
RUN npm run build

# Etapa de execução
FROM node:20-alpine3.20

WORKDIR /app

# Copia os arquivos compilados do container de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Copia o arquivo .env para o estágio final
COPY --from=build /app/.env ./

# Expõe a porta que a aplicação irá utilizar
EXPOSE 3333

# Comando para iniciar a aplicação
# CMD ["node", "start"]
CMD ["sh", "-c", "npm run migrate && npm run start"]
