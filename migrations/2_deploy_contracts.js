const UserRegistry = artifacts.require("UserRegistry")
const KurateNFT = artifacts.require("KurateNFT");

module.exports = function (deployer) {
    deployer.deploy(UserRegistry);
    deployer.deploy(KurateNFT);
};
