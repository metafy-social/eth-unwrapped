import axios from "axios";

import {
    MORALIS_API_KEY
} from "./../utils/config";
import { 
    MORALIS_BASE_URL
} from "./../utils/enums";

import {
    NFTData    
} from './../interfaces';

export async function getCollectedNFTs(address: string): Promise<[NFTData | null, string | null]> {
    const options = {
        method: 'GET',
        url: `${MORALIS_BASE_URL}/${address}/nft?chain=eth&format=decimal&normalizeMetadata=false`,
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