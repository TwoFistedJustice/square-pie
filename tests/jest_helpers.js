// set a timeout to 1 minute and then have it run the test suite via npm run test

const delay = function (callback, seconds = 1) {
  const milliseconds = seconds * 1000;
  console.log("Ready....go!");
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, milliseconds);
};

module.exports = {
  delay,
};
