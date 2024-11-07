FROM node:20-alpine

WORKDIR /DIGITAL-HUMAN

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
