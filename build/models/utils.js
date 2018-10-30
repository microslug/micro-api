'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// utils for testing

var getRandom = function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
};

var generateRandomSlug = exports.generateRandomSlug = function generateRandomSlug() {
  var base62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var numChars = 7;
  var result = '';
  for (var i = 0; i < numChars; i++) {
    var randomIndex = getRandom(0, base62.length - 1);
    result += base62[randomIndex];
  }
  return result;
};
//# sourceMappingURL=utils.js.map