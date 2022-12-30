import axios from "axios";

import {
    MORALIS_API_KEY
} from "./../utils/config";
import {
    MORALIS_BASE_URL
} from "./../utils/enums";
import {
    BalanceData
} from "./../interfaces";

export async function getBalance(address: string) : Promise<[BalanceData | null, string | null]> {
    const options = {
        method: 'GET',
        url: `${MORALIS_BASE_URL}/${address}/balance?chain=eth`,
        headers: {
            accept: 'application/json', 
            'X-API-Key': MORALIS_API_KEY
        }
    };

    try {
        const { data } = await axios.request(options);
        return [data satisfies BalanceData, null];
    } catch (error) {
        if (error instanceof Error) {
            return [null, error.message];
        }
        return [null, 'An unknown error occurred. Please try again later.'];
    }
}