const KurateNFT = artifacts.require("KurateNFT");

module.exports = function (deployer) {
    deployer.deploy(KurateNFT);
};
