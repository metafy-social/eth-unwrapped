export default interface NFT {
    token_address: string;
    token_id: string;
    owner_of: string;
    block_number: string;
    block_number_minted: string;
    token_hash: string;
    amount: string;
    contract_type: string;
    name: string;
    symbol: string;
    token_uri: string;
    metadata: string | null;
    last_token_uri_sync: string;
    last_metadata_sync: string;
    minter_address: string | null;
}