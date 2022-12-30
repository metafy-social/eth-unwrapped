// import app from './main';
// import {
//     PORT
// } from './utils/config';

// app.listen(PORT, () => {
//     console.log('Server started on port 3000');
// });

import { getTransactionCount } from "./lib/transactions";

getTransactionCount("0x377ba90a0f828eaC2E63f956875a69e0c16D4C36").then(([data, error]) => {
    if (error) {
        console.log(error);
    }
    console.log(data);
});