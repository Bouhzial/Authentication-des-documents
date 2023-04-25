const DiplomaContract = artifacts.require("DiplomaContract");
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(DiplomaContract)
};
