FROM node

COPY . .

RUN npm i

CMD [ "node", "." ]