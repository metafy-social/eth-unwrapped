import { 
    BalanceData, 
    NFTData, 
    Transaction, 
    TransactionData,
    Unwrapped 
} from "../interfaces";
import { TokenData } from "../types";
import {
    getCollectedNFTs,
    getCollectedTokens,
    contractsCreated,
    getTransactions,
    getOldestTransaction,
    getBalance,
    swaps,
    getFirstTransactionOf2022
} from "./";
import timeAgo from './../utils/time';

const base = 1000000000000;

export async function metaScore(address: string) : Promise<[Unwrapped | null, string | null]> {
    // let metaScore = 0.0;
    let unwrapped: Unwrapped = {
        score: 0.0
    };

    let nfts: NFTData | null, _;
    [nfts , _] = await getCollectedNFTs(address);
    if(!nfts) return [null, "No NFTs found for this address"];
    unwrapped['score'] += nfts.total*3;
    unwrapped['nfts'] = nfts.total;

    let tokens: TokenData | null;
    [tokens, _] = await getCollectedTokens(address);
    if(!tokens) return [null, "No tokens found for this address"];
    unwrapped['score'] += tokens.length*2;
    unwrapped['tokens'] = tokens.length;

    let contracts: number | null;
    [contracts, _] = await contractsCreated(address);
    if(contracts===null) return [null, "No contracts found for this address"];
    unwrapped['score'] += contracts*5;
    unwrapped['contracts'] = contracts;

    let transactions: TransactionData | null;
    [transactions, _] = await getTransactions(address);
    if (!transactions) return [null, "No transactions found for this address"];
    unwrapped['score'] += transactions.total;
    unwrapped['transactions'] = transactions.total;
    
    let oldestTransaction: Transaction | null;
    [oldestTransaction, _] = await getOldestTransaction(address);
    // console.log("Oldest ", oldestTransaction?.block_timestamp);
    if (oldestTransaction!==null) {
        const block_timestamp = oldestTransaction.block_timestamp;
        const block_timestamp_date = new Date(block_timestamp);
        const time_ago = timeAgo.format(block_timestamp_date.getTime());
        const current = Date.now();
        const diff = current - block_timestamp_date.getTime();
        const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        unwrapped['score'] += diffMonths*4;
        unwrapped['oldest'] = {
            block_timestamp: block_timestamp_date.getTime(),
            time_ago: time_ago
        };
    } else {
        unwrapped['oldest'] = null;
    }

    let balance: BalanceData | null;
    [balance, _] = await getBalance(address);
    if (!balance) return [null, "No balance found for this address"];
    unwrapped['score'] += (Number(balance.balance)/base);

    let swap: number | null;
    [swap, _] = await swaps(transactions);
    if (swap===null) return [null, "No swaps found for this address"];
    unwrapped['score'] += swap*3;
    unwrapped['swaps'] = swap;

    let firstTransaction2022: Transaction | null;
    [firstTransaction2022, _] = await getFirstTransactionOf2022(transactions);
    if (firstTransaction2022===null) unwrapped['first_transaction_2022'] = null;
    else unwrapped['first_transaction_2022'] = (new Date(firstTransaction2022.block_timestamp)).getTime();

    return [unwrapped, null];
}

