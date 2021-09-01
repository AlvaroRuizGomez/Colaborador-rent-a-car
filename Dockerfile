# syntax = docker/dockerfile:1.2
FROM mhart/alpine-node:16.4.2 as builder
WORKDIR /usr/src/app
COPY package*.json ./

# RUN --mount=type=cache,target=/root/.npm/_cacache npm ci --only=production
RUN npm ci --only=production

COPY ./src ./src
COPY ./public ./public

RUN npm install -g pkg && \
    # pkg ./src/index.js --targets node16-linux-x64 --compress Brotli --output /usr/src/app/frontend -c ./package.json
    pkg ./src/index.js --targets node16-linux-x64 --compress GZip --output /usr/src/app/frontend -c ./package.json


FROM busybox AS util_builder

# ARG TINI_VERSION=v0.19.0
# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
# RUN chmod +x tini

FROM gcr.io/distroless/cc:nonroot

USER 1001
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/frontend .
COPY --from=util_builder /bin/wget /usr/bin/wget
# COPY --from=util_builder /tini /usr/bin/tini

# ENTRYPOINT [ "/usr/bin/tini", "--" ]
CMD [ "/usr/src/app/frontend"]

HEALTHCHECK --interval=60s \
    --start-period=5s \
    --timeout=10s \
    --retries=3 \
    CMD ["/usr/bin/wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/.well-known/acme-challenge/"]
