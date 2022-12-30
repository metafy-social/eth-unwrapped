import { NFT } from './';

export default interface NFTData {
    total: number;
    page: number;
    page_size: number;
    cursor: string | null;
    result: NFT[];
    status: string | null;
}