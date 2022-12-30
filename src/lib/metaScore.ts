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
    swaps
} from "./";
import timeAgo from './../utils/time';

const base = 1000000000000;

export async function metaScore(address: string) : Promise<[Unwrapped | null, string | null]> {
    // let metaScore = 0.0;
    let unwrapped = {
        score: 0.0
    } satisfies Unwrapped;

    let nfts: NFTData | null, _;
    [nfts , _] = await getCollectedNFTs(address);
    if(!nfts) return [null, "No NFTs found for this address"];
    unwrapped['score'] += nfts.total*3;
    console.log("NFTs", nfts.total);

    let tokens: TokenData | null;
    [tokens, _] = await getCollectedTokens(address);
    if(!tokens) return [null, "No tokens found for this address"];
    unwrapped['score'] += tokens.length*2;
    console.log("Tokens", tokens.length);

    let contracts: number | null;
    [contracts, _] = await contractsCreated(address);
    if(contracts===null) return [null, "No contracts found for this address"];
    unwrapped['score'] += contracts*5;
    console.log("Contracts", contracts);

    let transactions: TransactionData | null;
    [transactions, _] = await getTransactions(address);
    if (!transactions) return [null, "No transactions found for this address"];
    unwrapped['score'] += transactions.total;
    console.log("Transactions", transactions.total);
    
    let oldestTransaction: Transaction | null;
    [oldestTransaction, _] = await getOldestTransaction(address);
    if (!oldestTransaction) return [null, "No oldest transaction found for this address"];
    // console.log("Oldest ", oldestTransaction?.block_timestamp);
    const block_timestamp = oldestTransaction?.block_timestamp;
    if (!block_timestamp) console.log("No block timestamp found for this address");
    const block_timestamp_date = new Date(block_timestamp);
    const time_ago = timeAgo.format(block_timestamp_date.getTime());
    console.log("Oldest ", time_ago);
    const current = Date.now();
    const diff = current - block_timestamp_date.getTime();
    const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    unwrapped['score'] += diffMonths*4;

    let balance: BalanceData | null;
    [balance, _] = await getBalance(address);
    if (!balance) return [null, "No balance found for this address"];
    unwrapped['score'] += (Number(balance.balance)/base);
    console.log("Balance ", balance.balance, " ", Number(balance.balance)/base);

    let swap: number | null;
    [swap, _] = await swaps(transactions);
    if (swap===null) return [null, "No swaps found for this address"];
    unwrapped['score'] += swap*3;
    console.log("Swaps ", swap);

    return [unwrapped, null];
}

