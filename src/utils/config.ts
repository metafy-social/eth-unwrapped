import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MORALIS_API_KEY = process.env.MORALIS_API_KEY || '';