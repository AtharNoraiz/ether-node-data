export default class Web3Service {
    constructor(web3Instance) {
        this._web3 = web3Instance;
    }
    async getblockById(id) {
        return this._web3.eth.getBlock(id, true);
    }
}