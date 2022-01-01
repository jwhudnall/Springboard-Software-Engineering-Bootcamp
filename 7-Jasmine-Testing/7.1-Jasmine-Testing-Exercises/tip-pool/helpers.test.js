describe("Helpers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // Setup Tests
    allPayments = {
      "payment1": {
        "billAmt": "100",
        "tipAmt": "5",
        "tipPercent": 5
      }
    };

  });

  it('sumPaymentTotal should correctly calculate different categories of allPayments', function() {
    expect(sumPaymentTotal('tipAmt')).toEqual(5);
    expect(sumPaymentTotal('billAmt')).toEqual(100);
    expect(sumPaymentTotal('tipPercent')).toEqual(5);
  });

  it('calculateTipPercent should correctly calculate tip percentage', function() {
    let billAmt = 100;
    let tipAmt = 5;
    expect(calculateTipPercent(billAmt, tipAmt)).toEqual(5);
    expect(calculateTipPercent(billAmt, tipAmt)).not.toEqual(6);
  })

  afterEach(function () {
    // teardown tests
    allPayments = {};
  });
});