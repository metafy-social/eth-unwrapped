export default interface Unwrapped {
    nfts?: number;
    tokens?: number;
    contracts?: number;
    oldest?: {
        block_timestamp: number;
        time_ago: string;
    } | null;
    first_transaction_2022?: number | null;
    swaps?: number;
    transactions?: number;
    score: number;
}