import axios from "axios";

import {
    MORALIS_API_KEY
} from "./../utils/config";
import { 
    MORALIS_BASE_URL
 } from "./../utils/enums";

export async function getCollectedNFTs(address: string): Promise<void> {
    const options = {
        method: 'GET',
        url: `${MORALIS_BASE_URL}/address/nft?chain=eth&format=decimal&normalizeMetadata=false`,
        headers: {
            accept: 'application/json', 
            'X-API-Key': MORALIS_API_KEY
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data); 
    } catch (error) {
        console.error(error);
    }
}