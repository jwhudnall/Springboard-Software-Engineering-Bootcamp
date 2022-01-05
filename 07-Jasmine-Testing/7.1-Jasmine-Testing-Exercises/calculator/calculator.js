window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const loan = document.getElementById("loan-amount");
  const term = document.getElementById("loan-years")
  const rate = document.getElementById("loan-rate");

  loan.value = 100000;
  term.value = 30;
  rate.value = 5;

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues();
  const payment = calculateMonthlyPayment(values);
  updateMonthly(payment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let rate = values.rate / 100 / 12;
  let n = values.years * 12;
  let amount = values.amount;
  let payment = (amount * rate) / (1 - (1 + rate) ** (-n));

  if (isNaN(payment) || payment === Infinity) {
    return 'Invalid Input'
  }
  payment = Math.round(payment * 100) / 100;
  return payment;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const paymentSpan = document.querySelector('#monthly-payment');
  monthly = monthly.toString();
  paymentSpan.textContent = monthly;
}
