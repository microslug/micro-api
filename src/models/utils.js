// utils for testing

const getRandom = (floor, ceiling) => {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
};

export const generateRandomSlug = () => {
  const base62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const numChars = 7;
  let result = '';
  for (let i = 0; i < numChars; i++) {
    let randomIndex = getRandom(0, base62.length - 1);
    result += base62[randomIndex];
  }
  return result;
};
