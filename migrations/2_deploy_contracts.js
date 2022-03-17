const KurateNFT = artifacts.require('KurateNFT')
const UserRegistry = artifacts.require('UserRegistry')

module.exports = function (deployer) {
	deployer.deploy(KurateNFT)
	deployer.deploy(UserRegistry)
}
