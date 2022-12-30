import axios from "axios";

import {
    MORALIS_API_KEY
} from "./../utils/config";
import {
    MORALIS_BASE_URL
} from "./../utils/enums";
import {
    TransactionData
} from "./../interfaces";

export async function getTransactions(address: string) : Promise<[TransactionData | null, string | null]> {
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
        return [data, null];
    } catch (error) {
        if (error instanceof Error) {
            return [null, error.message];
        }
        return [null, 'An unknown error occurred. Please try again later.'];
    }
}

export async function getTransactionCount(address: string) : Promise<[number | null, string | null]> {
    const [transactions, error] = await getTransactions(address);
    if (error) {
        return [null, error];
    }
    return [transactions?.total as number, null];
}