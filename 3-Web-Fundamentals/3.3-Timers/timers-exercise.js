// ** Timers Exercise **
// countdown
const countDown = function (n) {
  let count = setInterval(function() {
    n --;
    if (n) {
      console.log(n);
    } else {
      console.log('DONE!');
      clearInterval(count);
    }
  }, 1000);
};

// randomGame
const randomGame = function() {
  // initialize counter at 0
  let count = 0;
  let randomNum = setInterval(function() {
    let rand = Math.random();
    count++;
    if (rand > .75) {
      console.log(`Number of tries: ${count}`);
      clearInterval(randomNum);
    }
  }, 1000);
};