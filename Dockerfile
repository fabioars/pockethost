FROM node:18-alpine as buildbox
COPY --from=golang:1.19-alpine /usr/local/go/ /usr/local/go/
ENV PATH="/usr/local/go/bin:${PATH}"
RUN apk add python3 py3-pip make gcc musl-dev g++ bash