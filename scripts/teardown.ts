import {
    disconnectDb
} from '../src/utils/mongodb';

export default async () => {
    await disconnectDb();
}

