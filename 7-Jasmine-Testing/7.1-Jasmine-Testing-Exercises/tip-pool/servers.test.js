describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    // billAmtInput.value = 100;
    // tipAmtInput.value=10;
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should update serverTable', function() {
    // Implement Tests for updateServerTable();
    submitServerInfo();

    let cells = document.querySelectorAll('#serverTable tbody tr td');

    expect(cells.length).toEqual(3);
    expect(cells[0].innerText).toBe('Alice');
    expect(cells[1].innerText).toEqual('$0.00');
    expect(cells[2].innerText).toEqual('X');
  });

  afterEach(function() {
    // teardown logic
    document.querySelector('#serverTable tbody').innerHTML = '';
    serverNameInput.value = '';
    serverId = 0;
    allServers = {};
  });
});
