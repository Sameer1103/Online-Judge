FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN apk add --update --no-cache python3 g++
CMD ["npm", "run", "dev"]
