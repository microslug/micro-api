
//var expect  = require('chai').expect;
//var request = require('request');
import { expect } from 'chai';
import assert from 'assert';
import request from 'request';
//import supertest from 'supertest'
var server = require('supertest')('http://localhost:8080');

// import methods to test

import { db, dbKeySize } from '../src/models/initDB';
import { generateSlug, counterToSlug } from '../src/models/slugCreator';




describe('API Tests', function() {
  describe ('Root URL', function() {
    xit('status', function(done){
      request('http://localhost:8080/', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('/Shrink page', () => {
    xit('it should return a db json', (done) => {
      const postBody = {
        url: 'http%3A%2F%2Fwww.startpage.com'
      };
      server
        .post('/v1/shrink')
        .send(postBody)
        .set('Accept', 'application/json')
        .end((err, res) => {
          assert.equal(res.body.db,'fake response from DB');
          done();
        });
    });
  });

});

describe ('Method tests', function() {
  describe ('Generate Slug', function() {
    xit('Should get a slug with 6 characters', function (done) {
      generateSlug(db,'http%3A%2F%2Fwww.startpage.com');
      done();
      assert.equal(slug.length,7);
    });
  });
  describe ('Slug generation', function() {
    xit('Three million unique slugs generated.', function (done) {
      this.timeout(done, 600);
      let duplicate = false;
      var store = {};
      // let lowerLimit = 56800235580;
      // let upperLimit = 56800235584;
      //let lowerLimit = 32760;
      //let upperLimit = 32769;
      //let step = 159261

      // 3 million slugs test
      let lowerLimit = 0;
      let upperLimit = 3000000;

      let step = 1;
      for (let t=lowerLimit;t<upperLimit;t+=step) {
        var slug = counterToSlug(t);
        if (slug in store) duplicate = slug;
        store[slug] = {};
      //console.log('Counter: ',t,'Slug: ',slug);
      }
      assert.equal(Object.keys(store).length,(upperLimit-lowerLimit));
      assert.equal(duplicate,false);
      done();
    });
  });

});
