import app from './main';
import {
    PORT
} from './utils/config';

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// vitalik : 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
