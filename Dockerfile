FROM node:19.5.0-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install vue-router lodash vue-i18n axios dotenv chart.js

RUN npm install vuex@next --save

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]