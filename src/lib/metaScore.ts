import {
    getCollectedNFTs
} from "./collectedNFT";
import {
    getCollectedTokens
} from "./collectedTokens";
import {
    contractsCreated
} from "./contractsCreated";
import {
    getTransactions
} from "./transactions";
import {
    getOldestTransaction
} from "./oldestTransaction";
import {
    getBalance
} from "./getbalance";
import {
    swaps
} from "./swaps";

const base = 1000000000000;

export async function metaScore(address: string) : Promise<[number | null, string | null]> {
    let metaScore = 0.0;

    let nfts, _;
    [nfts , _] = await getCollectedNFTs(address);
    if(nfts != null){
        metaScore += nfts.total*3;
        console.log("NFTs", nfts.total);
    }

    let tokens;
    [tokens, _] = await getCollectedTokens(address);
    if(tokens != null){
        metaScore += tokens.length*2;
        console.log("Tokens", tokens.length);
    }

    let contracts;
    [contracts, _] = await contractsCreated(address);
    if(contracts != null){
        metaScore += contracts*5;
        console.log("Contracts", contracts);
    }

    let transactions;
    [transactions, _] = await getTransactions(address);
    if(transactions != null){
        metaScore += transactions.total;
        console.log("Transactions", transactions.total);
    }

    let oldestTransaction;
    [oldestTransaction, _] = await getOldestTransaction(address);
    console.log("Oldest ", oldestTransaction?.block_timestamp);

    let balance;
    [balance, _] = await getBalance(address);
    if(balance != null){
        metaScore += (Number(balance.balance)/base);
        console.log("Balance ", balance.balance, " ", Number(balance.balance)/base);
    }

    let swap;
    [swap, _] = await swaps(address);
    if(swap != null){
        metaScore += swap*3;
        console.log("Swaps ", swap);
    }

    return [metaScore, null];
}

