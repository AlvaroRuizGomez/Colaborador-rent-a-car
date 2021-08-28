# syntax = docker/dockerfile:1.2
FROM mhart/alpine-node:16.2.0 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

COPY ./src ./src
COPY ./public ./public

RUN npm install -g pkg && \
    pkg ./src/index.js --targets node16-linux-x64 --compress GZip --output /usr/src/app/frontend -c ./package.json

FROM gcr.io/distroless/cc:nonroot

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/frontend .

USER 1001
CMD [ "/usr/src/app/frontend" ]