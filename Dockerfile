FROM node:21.1.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3002
CMD [ "./start"]
