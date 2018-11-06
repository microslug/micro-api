# build image

# setup buildtools for environment (cached)
FROM node:9.6.1 as buildtools
# 

# copy source code
FROM buildtools as sourcecode
# Copy all files except onces listed in .dockerignore
COPY . /usr/src/app

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
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm run build


# production environment
FROM node:9.6.1 
COPY --from=builder /usr/src/app/build /usr/src/app/build
COPY --from=dependencies /usr/src/app /usr/src/app
WORKDIR /usr/src/app
CMD ["node", "./build/index.js"]
