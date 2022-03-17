require('@nomiclabs/hardhat-ethers')

const { expect } = require('chai')

let kurateNFT

describe('KurateNFT', function () {
	it('Should return correct token Symbol', async function () {
		const KurateNFT = await ethers.getContractFactory('KurateNFT')
		kurateNFT = await KurateNFT.deploy()
		expect(await kurateNFT.symbol.call()).to.equal('KURA')
	})
	it('Should mint a token', async function () {
		const [owner, addr1] = await ethers.getSigners()
		const res = await kurateNFT.mintToken(addr1.address, 12345, 'this is unique')
	})
	it('Should have been received 1', async function () {
		const [owner, addr1] = await ethers.getSigners()
		expect(await kurateNFT.balanceOf(addr1.address)).to.equal(1)
	})
	it('Should be able to transfer to another account', async function () {
		const [owner, addr1, addr2] = await ethers.getSigners()
		let res = await kurateNFT.connect(addr1).transferFrom(addr1.address, addr2.address, 12345)
		expect(res.from).to.equal(addr1.address)
	})
	it('Should have been received by 2', async function () {
		const [owner, addr1, addr2] = await ethers.getSigners()
		expect(await kurateNFT.balanceOf(addr2.address)).to.equal(1)
	})
})
