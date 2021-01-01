import {Blocks} from './blocks';
import {Transactions} from './transactions';
export default function(db) {
  const models = {
    db: db,
    blocks: new Blocks(db),
    transactions: new Transactions(db),
  };
  return models;
}
