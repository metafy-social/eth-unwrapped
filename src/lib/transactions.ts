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

export async function getTransactions(address: string) : Promise<[TransactionData | null, string | null]> {
    const options = {
        method: 'GET',
        url: `${MORALIS_BASE_URL}/${address}?chain=eth&from_date=2022-01-01`,
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
                url: `${MORALIS_BASE_URL}/${address}?chain=eth&from_date=2022-01-01&cursor=${data.cursor}`,
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

export async function getFirstTransactionOf2022(transactions: TransactionData) : Promise<[Transaction | null, string | null]> {
    const firstTransaction = transactions?.result[transactions?.total - 1];
    return [(firstTransaction satisfies Transaction) || null, null];
}