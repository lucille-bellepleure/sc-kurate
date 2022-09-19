// const KurateNFT = artifacts.require('KurateNFT')
// const UserRegistry = artifacts.require('UserRegistry')
const ERC20zkSWT = artifacts.require('ERC20zkSWT')

module.exports = function (deployer) {
	// deployer.deploy(KurateNFT)
	// deployer.deploy(UserRegistry)
	deployer.deploy(ERC20zkSWT)
}
