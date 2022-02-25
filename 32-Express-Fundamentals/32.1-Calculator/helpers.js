function median(lst) {
  const mid = Math.floor(lst.length / 2);
  const nums = [...lst].sort((a, b) => a - b);
  if (lst.length % 2 === 0) {
    return (nums[mid] + nums[mid - 1]) / 2;
  }
  return nums[mid];
}

function mean(lst) {
  const sum = lst.reduce((acc, next) => {
    return acc + next;
  });
  return sum / lst.length;
}

function mode(lst) {
  const counts = lst.reduce((acc, next) => {
    if (acc[next] === undefined) {
      acc[next] = 1;
    } else {
      acc[next] = acc[next] + 1;
    }
    return acc;
  }, {});
  const results = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return parseInt(results[0][0]);
}

function calcResponse(operation, result) {
  return {
    response: {
      operation: operation,
      value: result,
    },
  };
}

function handleInput(input) {
  // Returns object with error message if error, else split numList.
  if (!input) {
    console.log("Input is undefined!");
    return { error: "'nums' input is required." };
  }
  const numList = input
    .toString()
    .split(",")
    .map((n) => parseInt(n));
  if (numList.includes(NaN)) {
    console.log("Input has invalid character!");
    return { error: "All 'nums' values must be numbers." };
  }
  console.log(`Input is valid. Value: ${numList}`);
  return numList;
}

module.exports = {
  median,
  mean,
  mode,
  calcResponse,
  handleInput,
};
