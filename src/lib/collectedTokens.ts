import axios from "axios";

import {
    MORALIS_API_KEY
} from "./../utils/config";
import { 
    MORALIS_BASE_URL
} from "./../utils/enums";

export async function getCollectedTokens(address: string) : Promise<void> {
    const options = {
        method: 'GET',
        url: `${MORALIS_BASE_URL}/${address}/erc20?chain=eth`,
        headers: {
            accept: 'application/json', 
            'X-API-Key': MORALIS_API_KEY
        }
    };

    try {
        const { data } = await axios.request(options);
        return [data satisfies NFTData, null];
    } catch (error) {
        if (error instanceof Error) {
            return [null, error.message];
        }
        return [null, 'An unknown error occurred. Please try again later.'];
    }
}