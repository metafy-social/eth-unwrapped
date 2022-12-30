import { Transaction } from "./";

export default interface TransactionData {
    total: number;
    page: number;
    page_size: number;
    cursor: string | null;
    result: Transaction[];
}

