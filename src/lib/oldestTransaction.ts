import axios from "axios";

import {
    MORALIS_API_KEY
} from "./../utils/config";
import {
    MORALIS_BASE_URL
} from "./../utils/enums";
import {
    TransactionData, Transaction
} from "./../interfaces";

async function getTransactions(address: string) : Promise<[TransactionData | null, string | null]> {
    const options = {
        method: 'GET',
        url: `${MORALIS_BASE_URL}/${address}?chain=eth`,
        headers: {
            accept: 'application/json', 
            'X-API-Key': MORALIS_API_KEY
        }
    };


    try {
        const { data } = await axios.request(options);
        while(data.cursor !== null) {
            const { data: nextData } = await axios.request({
                method: 'GET',
                url: `${MORALIS_BASE_URL}/${address}?chain=eth&cursor=${data.cursor}`,
                headers: {
                    accept: 'application/json', 
                    'X-API-Key': MORALIS_API_KEY
                }
            });
            data.result = [...data.result, ...nextData.result];
            data.cursor = nextData.cursor;
        }

        return [data, null];
    } catch (error) {
        if (error instanceof Error) {
            return [null, error.message];
        }
        return [null, 'An unknown error occurred. Please try again later.'];
    }
}

export async function getOldestTransaction(address: string) : Promise<[Transaction | null, string | null]> {
    const [transactions, error] = await getTransactions(address);
    if (error) {
        return [null, error];
    }
    const firstTransaction = transactions?.result[transactions?.total - 1];
    return [firstTransaction as Transaction, null];
}