// import app from './main';
// import {
//     PORT
// } from './utils/config';

// app.listen(PORT, () => {
//     console.log('Server started on port 3000');
// });

import { getFirstTransactionOf2022 } from "./lib/transactions";
import { getOldestTransaction } from "./lib/oldestTransaction";

getFirstTransactionOf2022("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045").then(([data, error]) => {
    if (error) {
        console.log(error);
    }
    console.log("2022 started : ", data?.block_timestamp);
});
getOldestTransaction("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045").then(([data, error]) => {
    if (error) {
        console.log(error);
    }
    console.log("Oldest : ", data?.block_timestamp);
});