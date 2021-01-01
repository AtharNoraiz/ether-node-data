export class Blocks {
    constructor(db) {
      this._db = db;
    }
    async insert(blockDTO) {
      const connection = this._db;
      const query = `INSERT INTO public.blocks(
        "timestamp",
        "number",
        hash,
        parent_hash,
        nonce,
        sha3_uncles,
        logs_bloom,
        transactions_root,
        state_root,
        receipts_root,
        miner,
        difficulty,
        total_difficulty,
        size, extra_data,
        gas_limit,
        gas_used,
        transaction_count)
        VALUES (
            to_timestamp(${blockDTO.timestamp}),
            ${blockDTO.number},
            '${blockDTO.hash}',
            '${blockDTO.parentHash}',
            '${blockDTO.nonce}',
            '${blockDTO.sha3Uncles}',
            '${blockDTO.logsBloom}',
            '${blockDTO.transactionsRoot}',
            '${blockDTO.stateRoot}',
            '${blockDTO.receiptsRoot}',
            '${blockDTO.miner}',
            '${blockDTO.difficulty}',
            '${blockDTO.totalDifficulty}',
            ${blockDTO.size},
            '${blockDTO.extraData}',
            ${blockDTO.gasLimit},
            ${blockDTO.gasUsed},
            ${blockDTO.transactionCount}) on conflict (number) do nothing;`;
        return connection.any(query);
    }
  }
  