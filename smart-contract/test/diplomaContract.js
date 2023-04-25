const DiplomaContract = artifacts.require("DiplomaContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("DiplomaContract", function (/* accounts */) {
  it("should assert true", async function () {
    await DiplomaContract.deployed();
    return assert.isTrue(true);
  });
});
