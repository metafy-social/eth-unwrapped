// import app from './main';
// import {
//     PORT
// } from './utils/config';

// app.listen(PORT, () => {
//     console.log('Server started on port 3000');
// });

import { getTransactions } from "./lib/transactions";

getTransactions("0xB62644Da3BB532FdA71eb7A3B3fd8977492A723D").then(([data, error]) => {
    if (error) {
        console.log(error);
    }
    console.log(data);
    console.log(data?.result.length);
});