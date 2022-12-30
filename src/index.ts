// import app from './main';
// import {
//     PORT
// } from './utils/config';

// app.listen(PORT, () => {
//     console.log('Server started on port 3000');
// });

// vitalik : 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

import { metaScore } from "./lib/metaScore";


metaScore("0xA7Cf5Ce90ab016b628152eaa96F57Da2Fdec012D").then(([data, error]) => {
    if (error) {
        console.log(error);
    }
    console.log("Score", data);
});