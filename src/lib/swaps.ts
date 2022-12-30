import { 
    TransactionData 
} from "../interfaces";

import {
    fetchOne
} from "./../Repository"

export async function swaps(transactions: TransactionData) : Promise<[number | null, string | null]> {
    let swaps = 0;
    if(transactions != null){
        let totalTransactions = transactions?.result.length;
        for(let i = 0; i < totalTransactions; i++){
            const [transactionData, error] = await fetchOne(transactions?.result[i].input.slice(2, 10));
            if (error) {
                return [null, error];
            }
            if(transactionData != null){
                if((transactionData.function as string).toLowerCase().search("swap") != -1){
                    swaps++;
                }
            }
        }
    }
    return [swaps, null];
}