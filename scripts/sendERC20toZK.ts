
 
const PRIVATE_KEY = "0x24937ade2aeb72fc034b7e136174c67c4a223d97e89516e2049c35d369103293";

const wallet = new Wallet(PRIVATE_KEY, zkSyncProvider, ethereumProvider);

// ETH deposit
// const ethDepositTx = await wallet.deposit({
//     token: utils.ETH_ADDRESS,
//     amount: '1000'
// });
// // Wait until the deposit is processed by zkSync
// await ethDepositTx.wait();

module.exports = async function(callback) {
// ERC20 deposit
const ercDepositTx = await wallet.deposit({
    token: '0x6842745bCDBa872C64CeE14C5036EF7AECD587ab',
    amount: '1000000',
    // If the zkSync contract does not have the necessary allowance yet,
    // we can set this flag to approve the deposit
    approveERC20: false
});
// Wait until the deposit is processed by zkSync
await ercDepositTx.wait().catch((e) => {console.log(e)});
console.log("something")
}