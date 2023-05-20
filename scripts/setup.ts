import {
    connectDb,
} from '../src/utils/mongodb';

export default async () => {
    await connectDb();
}