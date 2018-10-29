var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

client.set('Slug', 'destination URL', redis.print);
client.get('Slug', function (error, result) {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log('GET result ->' + result);
});

client.del('Slug', function(err, response) {
  if (response == 1) {
    console.log('Deleted Successfully!');
  } else{
    console.log('Cannot delete');
  }
});
