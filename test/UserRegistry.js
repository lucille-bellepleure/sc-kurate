const UserRegistry = artifacts.require("UserRegistry");

contract("UserRegistry", accounts => {

    let userRegistry;
    let contractOwner = {
        account: accounts[0]
    };
    let michelle = {
        account: accounts[1],
        publicKey: '0x8e61c1c370fd41c75e48f509eff57f39528e0ccf7f63aacfbd009dbd4be997b126bfb89f030395e8b5b5a03388659f9d1f28aeadf384b8a9b9f15c73982d8e2a',
        userName: 'Michelle',
        userAvatar: 'data:data'
    };
    let kiki = {
        account: accounts[2],
        publicKey: '0x62c60782be40fce0b915ff6eecd6e23a1eaf64f0654cb9962e8a89d1f27ce992d7b9a7cf1f7e318d575620026ca25b69c241d3ff31f5720e0c2665853c671eae',
        userName: 'Kiki',
        userAvatar: 'data:data'
    };
    let edina = {
        account: accounts[3],
        publicKey: '0xa7123e8516ffd258ef67aaf536426e66a1d8f37ff1f9eb087e7d218690a1276b179a5b998301178533506d6afb33ea12a4ac96b9b44cfebae04944d9c8428d67',
        userName: 'Edina',
        userAvatar: 'data:data'
    }

    it('Should initialise and set owner', async () => {
        userRegistry = await UserRegistry.deployed();
        let owner = await userRegistry.owner();
        assert.equal(accounts[0], owner, "UserRegistry is not owned by account 0");
    });

    it('Should not be able to set a new useraccount from unverified account', async () => {
        let user = await userRegistry.addUser(
            michelle.account,
            michelle.userName,
            michelle.userAvatar,
            michelle.publicKey,
            { from: kiki.account }
        );
        assert.revert('Indeed')
    });
    it('Should set a new useraccount (Michelle) from Verified user (Owner)', async () => {
        let user = await userRegistry.addUser(
            michelle.account,
            michelle.userName,
            michelle.userAvatar,
            michelle.publicKey,
            { from: contractOwner.account }
        );
        let registeredUser = await userRegistry.readUser(michelle.account);
        assert.equal(michelle.userName, registeredUser.userName);
    });
    it('Owner can give user godlike verification to Michelle',
        async () => {
            let result = await userRegistry.giveGodVerification(michelle.account, { from: contractOwner.account })
            let numVerifications = await userRegistry.checkVeracity(michelle.account);
            assert.equal(numVerifications.toNumber(), 10);
        });
    it('Should set a new useraccount (Kiki) from Verified user (Michelle)', async () => {
        let user = await userRegistry.addUser(
            kiki.account,
            kiki.userName,
            kiki.userAvatar,
            kiki.publicKey,
            { from: michelle.account }
        );
        let registeredUser = await userRegistry.readUser(kiki.account);
        assert.equal(kiki.userName, registeredUser.userName);
    });
    it('Should set a new useraccount (Edina) from Verified user (Michelle)', async () => {
        let user = await userRegistry.addUser(
            edina.account,
            edina.userName,
            edina.userAvatar,
            edina.publicKey,
            { from: michelle.account }
        );
        let registeredUser = await userRegistry.readUser(edina.account);
        assert.equal(edina.userName, registeredUser.userName);
    });
    it('Owner should verify Kiki', async () => {
        let result = await userRegistry.addVerification(kiki.account,
            { from: contractOwner.account }
        );
        let numVerifications = await userRegistry.checkVeracity(kiki.account);
        assert.equal(numVerifications.toNumber(), 1);
    });
    it('Michelle should verify Kiki', async () => {
        let result = await userRegistry.addVerification(kiki.account,
            { from: michelle.account }
        );
        let numVerifications = await userRegistry.checkVeracity(kiki.account);
        assert.equal(numVerifications.toNumber(), 2);
    });
    it('Edina should not be able to verify Kiki', async () => {
        let result = await userRegistry.addVerification(kiki.account,
            { from: edina.account }
        );
    });
    it('Kiki should verify Edina', async () => {
        let result = await userRegistry.addVerification(edina.account,
            { from: kiki.account }
        );
        let numVerifications = await userRegistry.checkVeracity(edina.account);
        assert.equal(numVerifications.toNumber(), 1);
    });
    it('Michelle should verify Edina', async () => {
        let result = await userRegistry.addVerification(edina.account,
            { from: michelle.account }
        );
        let numVerifications = await userRegistry.checkVeracity(edina.account);
        assert.equal(numVerifications.toNumber(), 2);
    });

})