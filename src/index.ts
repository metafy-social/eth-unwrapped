import app from './main';
import {
    PORT
} from './utils/config';
import {
    connectDb,
    disconnectDb
} from './utils/mongodb';

const server = connectDb().then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    return server;
})

process.on('SIGINT', async () => {
    await disconnectDb();
    (await server).close(() => {
        console.log("\x1b[31m%s\x1b[0m", 'Process terminated');
    });
});

// vitalik : 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
