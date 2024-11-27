function getRandomNumber(min, max) {
  let random = Math.floor(Math.random() * (max - min) + min);
  return random;
}

console.log(getRandomNumber(0, 100));
