require('@nomiclabs/hardhat-ethers')

const { expect } = require('chai')

let userRegistry

let michelle
let kiki
let edina

describe('UserRegistry', function () {
	it('Should return correct owner', async function () {
		const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners()
		let contractOwner = {
			account: owner,
		}
		michelle = {
			account: addr1.address,
			publicKey:
				'0x8e61c1c370fd41c75e48f509eff57f39528e0ccf7f63aacfbd009dbd4be997b126bfb89f030395e8b5b5a03388659f9d1f28aeadf384b8a9b9f15c73982d8e2a',
			userName: 'Michelle',
			userAvatar: 'data:data',
		}
		kiki = {
			account: addr2.address,
			publicKey:
				'0x62c60782be40fce0b915ff6eecd6e23a1eaf64f0654cb9962e8a89d1f27ce992d7b9a7cf1f7e318d575620026ca25b69c241d3ff31f5720e0c2665853c671eae',
			userName: 'Kiki',
			userAvatar: 'data:data',
		}
		edina = {
			account: addr3.address,
			publicKey:
				'0xa7123e8516ffd258ef67aaf536426e66a1d8f37ff1f9eb087e7d218690a1276b179a5b998301178533506d6afb33ea12a4ac96b9b44cfebae04944d9c8428d67',
			userName: 'Edina',
			userAvatar: 'data:data',
		}
		const UserRegistry = await ethers.getContractFactory('UserRegistry')
		userRegistry = await UserRegistry.deploy()
		expect(await userRegistry.owner.call()).to.equal(owner.address)
	})

	it('Should have a verificationthresh of 2', async () => {
		let verificationthresh = await userRegistry.verificationthresh.call()
		expect(verificationthresh.toNumber()).to.equal(2)
	})

	it('Should not be able to set a new useraccount from unverified account', async () => {
		const [owner, addr1] = await ethers.getSigners()
		await expect(
			userRegistry
				.connect(addr1)
				.createUser(michelle.account, michelle.publicKey, michelle.userName, michelle.userAvatar)
		).to.be.revertedWith('Only verified users can add new users')
	})

	it('Should set a new useraccount (Michelle) from Verified user (Owner)', async () => {
		const [owner] = await ethers.getSigners()
		let user = await userRegistry
			.connect(owner)
			.createUser(michelle.account, michelle.publicKey, michelle.userName, michelle.userAvatar)
		let registeredUser = await userRegistry.readUser(michelle.account)
		expect(michelle.userName).to.equal(registeredUser.userName)
	})

	it('Owner can give user godlike verification to Michelle', async () => {
		const [owner] = await ethers.getSigners()
		let user = await userRegistry.connect(owner).giveGodVerification(michelle.account)
		let numVerifications = await userRegistry.checkVeracity(michelle.account)
		expect(numVerifications.toNumber()).to.equal(10)
	})

	it('Should set a new useraccount (Kiki) from Verified user (Michelle)', async () => {
		const [owner, addr1] = await ethers.getSigners()
		let user = await userRegistry
			.connect(addr1)
			.createUser(kiki.account, kiki.publicKey, kiki.userName, kiki.userAvatar)
		let registeredUser = await userRegistry.readUser(kiki.account)
		expect(kiki.userName).to.equal(registeredUser.userName)
	})

	it('Should set a new useraccount (Edina) from Verified user (Michelle)', async () => {
		const [owner, addr1] = await ethers.getSigners()
		let user = await userRegistry
			.connect(addr1)
			.createUser(edina.account, edina.publicKey, edina.userName, edina.userAvatar)
		let registeredUser = await userRegistry.readUser(edina.account)
		expect(edina.userName).to.equal(registeredUser.userName)
	})

	it('Owner should verify Kiki', async () => {
		const [owner, addr1] = await ethers.getSigners()
		let result = await userRegistry.connect(owner).addVerification(kiki.account)
		let numVerifications = await userRegistry.checkVeracity(kiki.account)
		expect(numVerifications.toNumber()).to.equal(1)
	})

	it('Michelle should verify Kiki', async () => {
		const [owner, addr1] = await ethers.getSigners()
		let result = await userRegistry.connect(addr1).addVerification(kiki.account)
		let numVerifications = await userRegistry.checkVeracity(kiki.account)
		expect(numVerifications.toNumber()).to.equal(2)
	})

	it('Edina should not be able to verify Kiki', async () => {
		const [owner, addr1, addr2, addr3] = await ethers.getSigners()
		await expect(userRegistry.connect(addr3).addVerification(kiki.account)).to.be.revertedWith(
			'Only verified users can add new users'
		)
	})

	it('Kiki should verify Edina', async () => {
		const [owner, addr1, addr2, addr3] = await ethers.getSigners()
		let result = await userRegistry.connect(addr2).addVerification(edina.account)
		let numVerifications = await userRegistry.checkVeracity(edina.account)
		expect(numVerifications.toNumber()).to.equal(1)
	})

	it('Michelle should verify Edina', async () => {
		const [owner, addr1, addr2, addr3] = await ethers.getSigners()
		let result = await userRegistry.connect(addr1).addVerification(edina.account)
		let numVerifications = await userRegistry.checkVeracity(edina.account)
		expect(numVerifications.toNumber()).to.equal(2)
	})
})
