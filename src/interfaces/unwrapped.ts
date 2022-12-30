export default interface Unwrapped {
    nfts?: number;
    tokens?: number;
    contracts?: number;
    oldest?: {
        block_timestamp: number;
        time_ago: string;
    };
    first_transaction_2022?: number;
    swaps?: number;
    transactions?: number;
    score: number;
}