import * as JsonHelper from './../Helper/json';
import { DB_MODELS, DB_TABLES } from './../utils/modelEnums';
  
export async function fetchOne (hash: string) {
    try {
        // console.log(DB_MODELS.signatures)
        const data = await DB_MODELS.signatures.Sign.findOne({
            where: {
                hash
            }
        });
        return [JsonHelper.parse(data), null];
    } catch (err) {
        if (err instanceof Error) {
            return [null, err.message];
        }
        return [null, 'Error while fetching data.'];
    }
};
  
export async function fetchAll() {
    try {
        const data = await DB_MODELS.signatures.Sign.findAll();
        return [JsonHelper.parse(data), null];
    } catch (err) {
        if (err instanceof Error) {
            return [null, err.message];
        }
        return [null, 'Error while fetching all data.'];
    }
};