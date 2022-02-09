FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

ENV jwt_master_secret=jsonsecret
ENV username=rapmaster
ENV password=rap%4012345

CMD [ "npm", "start" ]