
it('should calculate the monthly rate correctly', function () {
  const values = {
    amount: 100000,
    years: 30,
    rate: 5
  };
  expect(calculateMonthlyPayment(values)).toBe(536.82);
});

it('should calculate the monthly rate correctly', function () {
  const values = {
    amount: 47500,
    years: 10,
    rate: 3.5
  };
  expect(calculateMonthlyPayment(values)).toBe(469.71);
});


it("should return a result with 2 decimal places", function() {
  const values = {
    amount: 100000,
    years: 30,
    rate: 5
  };
  expect(calculateMonthlyPayment(values)).not.toBe(536.821);
});

it("should handle interest rate of 0", function() {
  const values = {
    amount: 100000,
    years: 30,
    rate: 0
  };
  expect(calculateMonthlyPayment(values)).toBe("Invalid Input");
});

it("should handle term value of 0", function() {
  const values = {
    amount: 100000,
    years: 0,
    rate: 5
  };
  expect(calculateMonthlyPayment(values)).toBe("Invalid Input");
});
