# Mic.ro slug API

A URL shortener project

## Overview

This project is composed of three services:
* UX front end [micro-ux](https://github.com/microslug/micro-ux)
* API back end [micro-api](https://github.com/microslug/micro-api)
* Database     [redis](https://redis.io/)

This separation allows for scalability and ease of troubleshooting.

## Design

The goal was to be able to store lots of links (around 56 billion) with a short URL (slug) and perform fast lookups for redirection.
Additionally, we should be able horizontally scale this application to accommodate high volume.
A key value store database like REDIS is a good choice for this project since the lookup is O(1).
REDIS also has a handy feature that allows data to expire. We use this feature to expire links in 14 days.
We use the following model:
* slug
* destinationURL

The micro-api is a REST api and redirection service that stores and retrieves data from a database.
It is responsible for the following:
* Accept a encoded URL string, generates a 6 character hash and return a shortened URL (slug).
* Redirect slugs to destination URLs and updates the link expiry date.

Micro-api is a stateless application and generates the slugs from a sequential integer stored in Redis.
The integer is hashed and bit shifted to appear random.  It is then converted to a base62 number that becomes the slug.


Usage
-----
Install Redis [Redis OSX instructions](https://gist.github.com/tomysmile/1b8a321e7c58499ef9f9441b2faa0aa8)

```
git clone https://github.com/microslug/micro-ux.git
npm install
npm start
```
The app will configure the database on first run.

You can also start the local development server using `nodemon ./src/index.js --exec babel-node -e js`

Using [postman](https://www.getpostman.com/), you can create the following POST request:
localhost:8888/v1/shrink
{
  url: 'http%3A%2F%2Fwww.startpage.com'
}

Note that the url string has to be encoded.


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
