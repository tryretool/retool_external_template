FROM node:16.14.2-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN cd backend && npm i
RUN cd frontend && npm i
EXPOSE 3001
ENTRYPOINT ["./start"]
