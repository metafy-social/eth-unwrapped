import app from './main';
import {
    PORT
} from './utils/config';

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// vitalik : 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

// import { metaScore } from "./lib";

// metaScore("0x377ba90a0f828eaC2E63f956875a69e0c16D4C36").then(([data, error]) => {
//     if (error) {
//         console.log(error);
//     }
//     console.log("Score", data);
// });