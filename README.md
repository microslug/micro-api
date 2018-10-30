# Mic.ro slug API

A URL shortener project

## Overview

This project is composed of three services:
* UX front end [micro-api](https://github.com/microslug/micro-api)
* API back end [micro-ux](https://github.com/microslug/micro-ux)
* Database     [redis](https://redis.io/)

This separation allows for scalability and ease of troubleshooting.

## Design

The goal was to be able to store lots of links with a short URL (slug) and perform fast lookups for redirection.
Additionally, we should be able horizontally scale this application to accommodate high volume.
A key value store database like REDIS is a choice for this project since the lookup is O(1) and uses the following model
* slug
* destinationURL

The micro-api is a REST api and redirection service that stores and retrieves data from this Redis database.
It is responsible for the following:
* Accept a encoded URL string, generate a 6 character hash and return a shortened URL (slug).
* Redirect slugs to destination URLs.

Micro-api is a stateless application and generates the slugs from a sequential integer stored in Redis.
The integer is hashed and bit shifted to appear random.  It is then converted to a base62 number that becomes the slug.


Usage
-----


```
git clone https://github.com/microslug/micro-ux.git
npm install
npm start
```

Or start local development server using `nodemon ./src/index.js --exec babel-node -e js`

## API

Usage see https://micro-api.herokuapp.com/


## Tests

By default all tests are paused using 'xit'. To enable remove 'x' as in 
```
it('status', function(done){
```
then run
```
npm test
```
