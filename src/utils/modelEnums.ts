import Signatures from '../models';

export const DB_TABLES = {
    SIGNATURES: 'signatures',
} as const;

export const DB_MODELS = {
    signatures: Signatures,
} as const;