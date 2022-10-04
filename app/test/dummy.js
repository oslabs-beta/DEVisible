const fs = require('fs');

const sleep = (ms) => {
  return new Promise((res) => {
    setTimeout(() => res(), ms);
  });
};

const main = async (time) => {
  await sleep(time);
  // console.log(`build completed in ${time}ms`);
};

main(2000);
