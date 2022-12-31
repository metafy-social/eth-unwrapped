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

const base = 10000000000000000;

export async function metaScore(address: string) : Promise<[Unwrapped | null, string | null]> {
    let unwrapped: Unwrapped = {
        score: 0.0
    };

    let nfts: NFTData | null, _;
    let tokens: TokenData | null;
    let contracts: number | null;
    let transactions: TransactionData | null;
    let oldestTransaction: Transaction | null;
    let balance: BalanceData | null;
    let swap: number | null;
    let firstTransaction2022: Transaction | null;

    [
        [nfts, _],
        [tokens, _],
        [contracts, _],
        [transactions, _],
        [oldestTransaction, _],
        [balance, _],
    ] = await Promise.all([
        getCollectedNFTs(address),
        getCollectedTokens(address),
        contractsCreated(address),
        getTransactions(address),
        getOldestTransaction(address),
        getBalance(address),
    ]);

    if(!nfts) return [null, "No NFTs found for this address"];
    unwrapped['score'] += nfts.total*2;
    unwrapped['nfts'] = nfts.total;
    
    if(!tokens) return [null, "No tokens found for this address"];
    unwrapped['score'] += tokens.length;
    unwrapped['tokens'] = tokens.length;
    
    if(contracts===null) return [null, "No contracts found for this address"];
    unwrapped['score'] += contracts*3;
    unwrapped['contracts'] = contracts;
    
    if (!transactions) return [null, "No transactions found for this address"];
    unwrapped['score'] += transactions.total;
    unwrapped['transactions'] = transactions.total;
    
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
    
    if (!balance) return [null, "No balance found for this address"];
    unwrapped['score'] += (Number(balance.balance)/base);

    
    [swap, _] = await swaps(transactions);
    if (swap===null) return [null, "No swaps found for this address"];
    unwrapped['score'] += swap*1.5;
    unwrapped['swaps'] = swap;

    
    [firstTransaction2022, _] = await getFirstTransactionOf2022(transactions);
    if (firstTransaction2022===null) unwrapped['first_transaction_2022'] = null;
    else unwrapped['first_transaction_2022'] = (new Date(firstTransaction2022.block_timestamp)).getTime();

    return [unwrapped, null];
}

