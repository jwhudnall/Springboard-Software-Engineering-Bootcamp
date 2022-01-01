describe('Payments test (with setup and tear-down', function() {
  beforeEach(function() {
    billAmtInput.value = 100;
    tipAmtInput.value = 10;
  });

  it('Should populate currentPayment object', function() {
    // test createCurPayment()
    const expected = {
      billAmt: '100',
      tipAmt: '10',
      tipPercent: 10
    };
    expect(createCurPayment()).toEqual(expected);
  })

  it('Should update paymentTbody', function() {
    // test submitPaymentInfo()
    submitPaymentInfo();
    const paymentRow = document.querySelectorAll('#payment1 td');
    expect(paymentRow.length).toEqual(3);
    expect(paymentRow[0].innerText).toEqual('$100');
    expect(paymentRow[1].innerText).toEqual('$10');
    expect(paymentRow[2].innerText).toEqual('10%');
  })

  it('Should update shift summary', function() {
    // test updateSummary()
    submitPaymentInfo();
    expect(summaryTds.length).toEqual(3);
    expect(summaryTds[0].innerText).toEqual('$100');
    expect(summaryTds[1].innerText).toEqual('$10');
    expect(summaryTds[2].innerText).toEqual('10%');
  })



  afterEach(function() {
    // Tear down tests
    allPayments = {};
    paymentId = 0;
    billAmtInput.value = '';
    tipAmtInput.value = '';
    document.querySelector('#paymentTable tbody').innerHTML = '';
    document.querySelector('#summaryTable tbody').innerHTML = '';
  });
});