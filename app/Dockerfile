FROM node:16.3.0-stretch-slim

WORKDIR /opt/app

COPY ./ .
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]

