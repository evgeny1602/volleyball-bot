FROM node:20-slim AS builder
RUN apt-get update && apt-get install -y python3 make g++ 

WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN mkdir -p /app/data

EXPOSE 3000
CMD ["node", "server.js"]