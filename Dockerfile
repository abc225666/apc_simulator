FROM node:12

USER root

COPY ./src/ /app/src/
COPY ./config/ /app/config/
COPY ./package.json /app/

WORKDIR /app/

RUN npm install
RUN npm install dotenv 

EXPOSE 3030

CMD ["node", "src"]
