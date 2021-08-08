// set a timeout to 1 minute and then have it run the test suite via npm run test

// jest.setTimeout(function () {
//   console.log("NOW!");
// }, 100);
// var end = Date.now() + 12000;
// while (Date.now() < end);
// console.log("Run Tests...");

const timeDelay = function (callback, seconds = 1) {
  const milliseconds = seconds * 1000;
  console.log("Ready....go!");
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, milliseconds);
};

module.exports = {
  timeDelay,
};
