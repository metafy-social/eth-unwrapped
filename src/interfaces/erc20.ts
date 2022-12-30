export default interface ERC20 {
    token_address: string;
    name: string;
    symbol: string;
    logo: string | null;
    thumbnail: string | null;
    decimals: number;
    balance: string;
}