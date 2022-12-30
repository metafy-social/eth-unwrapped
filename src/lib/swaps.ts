import {
    getTransactions
} from "./transactions"

import {
    fetchOne
} from "./../Repository"

export async function swaps(address: string) : Promise<[number | null, string | null]> {
    const [transactions, error] = await getTransactions(address);
    if (error) {
        return [null, error];
    }
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