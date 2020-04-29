# build image

# setup buildtools for environment (cached)
FROM node:9.6.1 as buildtools
# 

# copy source code
FROM buildtools as sourcecode
# Copy all files except onces listed in .dockerignore
COPY . /usr/src/app

# add kubectl control from pod
FROM alpine:3.8 as kubectl
COPY dependencies/kubectl /usr/local/bin/kubectl
COPY dependencies/jq /usr/local/bin/jq
RUN chmod +x /usr/local/bin/jq
ENV HOME=/config
RUN set -x && apk add --no-cache curl ca-certificates && chmod +x /usr/local/bin/kubectl

# build node_module dependencies (cached)
FROM node:9.6.1 AS dependencies
RUN mkdir /usr/src/app
COPY package.json /usr/src/app
COPY .env /usr/src/app
WORKDIR /usr/src/app
RUN npm install --silent

# build project 
FROM sourcecode AS builder
# add `/usr/src/app/node_modules/.bin` to $PATH
COPY --from=dependencies /usr/src/app /usr/src/app
COPY .babelrc /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm run build


# production environment
FROM node:9.6.1 
COPY --from=builder /usr/src/app/build /usr/src/app/build
COPY --from=dependencies /usr/src/app /usr/src/app
COPY --from=kubectl /usr/local/bin/kubectl /usr/local/bin/kubectl
COPY --from=kubectl /usr/local/bin/jq /usr/local/bin/jq

WORKDIR /usr/src/app
CMD ["node", "./build/index.js"]
