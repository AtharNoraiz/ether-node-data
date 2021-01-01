import pgPromise from "pg-promise";
import Web3 from 'web3';
import Web3Service from './web3Service';
import Models from './models'

import config from "./config/index";
let web3 = new Web3("http://localhost:8545");

const web3Service = new Web3Service(web3);
const pgp = pgPromise();

// console.log('database config ======> ', config.database);
const db = pgp(config.database);
const models = Models(db);


async function start () {
    try {
        console.log('on script start : ');
        let result = await models.db.oneOrNone(`select block_number from transactions where confirmation_time is  NULL  order by block_number desc limit 1`);
        console.log(result);
        let lastServedBlockNumber= result ? Number(result.block_number):null
        //lastServedBlockNumber = lastServedBlockNumber ? Number(lastServedBlockNumber) :  await web3Service.getblockById(11547790);
        
        //lastServedBlockNumber = 1118022 ;
        for (let i = lastServedBlockNumber +1; i != 0; i++) {
            console.log('processing block number : ', i);
            const block = await web3Service.getblockById(i);
            block.transactionCount = block.transactions ? block.transactions.length : 0;
            if (block === null) {
                return;
            }
            await models.blocks.insert(block)
            for (const transaction of block.transactions) {
                if (block.transactionCount > 0) {
                 models.transactions.insert(transaction, block.timestamp);
            }
         }
        }
    } catch(error) {

    }
}

start();
