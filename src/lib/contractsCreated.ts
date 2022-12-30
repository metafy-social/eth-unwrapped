import {
    getTransactions
} from "./transactions"

export async function contractsCreated(address: string) : Promise<[number | null, string | null]> {
    const [transactions, error] = await getTransactions(address);
    if (error) {
        return [null, error];
    }
    const contractsCreated = transactions?.result.filter(transaction => transaction.input.slice(2, 10) === '60806040');
    return [contractsCreated?.length as number, null];
}