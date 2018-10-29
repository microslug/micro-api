import { logger } from '../utils/logger';

/********************************************************************************
 *
 * Generate a 6 charracter slug based on index from DB (dbKeySize)
 * where number of posible combinations is 56800235584 = 56,800,235,584
 * 7 char would be 3521614606208 = 3,521,614,606,208
 * 8 char 218340105584890 = 218,340,105,584,890
 *
 ********************************************************************************/

// Referece string for base62 encoding. Scrambled to make a sequence look random
let base62 = 'mo3RnXcSN9wHLpE5r72VkIFJsM1KfUqQZiaAjBTlDydOut84gChv06GzPxebYW';

// Scramble the digits helper
// function randomsort(a, b) {
// 	return Math.random()>.5 ? -1 : 1;
// }
// base62 = base62.split('').sort(randomsort).join('');
// console.log(base62, base62.split('').sort( (a,b) => {
//     return a.toLowerCase().localeCompare(b.toLowerCase());
// }).join(''));

export const generateSlug = (db,url) => {
  logger.info('generateSlug: url = ',url);
  return new Promise( (resolve,reject) => {
    db.get('slugCounter').then ( (counter,error) => {
      if (error) {
        reject(error);
        logger.error('Cannot get slugCounter ',error)
      }
      var slug = counterToSlug(counter);
      db.exists(slug).then ( (exists) => {
        if (!exists) {
          // write slug and set expiry time
          db.set(slug,url,'EX', process.env.SLUG_EXPIRY).then ( (status,error) => {
            if (error) {
              return console.log('Error: ', err.message);
            }
            logger.info('Slug added and set to expire in '+process.env.SLUG_EXPIRY)
            db.incr('slugCounter').then ( (counter,error) => {
              logger.info('Counter at '+counter)
              resolve(slug);
            });
          });
        } else {
          logger.error('Duplicate key. Incrementing counter.');
          db.incr('slugCounter').then ( (counter,error) => {
            logger.info('Counter incremented after detecting duplicate');
            generateSlug(db,url);
          });
          return false;
        }
      });
    });
  }); // Promise

};


/********************************************************************************
 *
 * Returns a hashed base62 number from an base10 counter
 * Counter is hashed by bitshifting to mask an obvious sequence
 * then converted to a base62 number
 ********************************************************************************/

export const counterToSlug = (counter) => {
  const counterHash = hash(counter);
  var slug = num_to_base62(counterHash);
  while (slug.length < 6) {
    slug = base62[0] + slug;
  }
  return slug;
};

function hash(n) {
  // split in half and rotate bits each way then combine
  const hash = ((((0x0000FFFF & n)<<16) >>>0) + (((0xFFFF0000 & n)>>>16)) >>> 0);
  return hash;
}


function num_to_base62( n )
{
  if ( n > 62 ) {
    return num_to_base62(Math.floor(n / 62)) + base62[n % 62];
  } else {
    return base62[n];
  }
}
