export class Transactions {
  constructor(db) {
    this._db = db;
  }
  async insert(transactionDTO, timestamp) {
    const connection = this._db;
    const query = `INSERT INTO public.transactions(
        hash,
        nonce,
        transaction_index,
        from_address,
        to_address,
        value,
        gas,
        gas_price,
        input,
        block_timestamp,
        block_number,
        block_hash)
        VALUES (
            '${transactionDTO.hash}',
            ${transactionDTO.nonce},
            ${transactionDTO.transactionIndex},
            '${transactionDTO.from}',
            '${transactionDTO.to}',
            '${transactionDTO.value}',
            ${transactionDTO.gas},
            '${transactionDTO.gasPrice}',
            '${transactionDTO.input}',
            to_timestamp(${timestamp}),
            ${transactionDTO.blockNumber},
            '${transactionDTO.blockHash}')
            `;
            console.log('===> transaction query is : ', query);
      return connection.any(query);
  }
}