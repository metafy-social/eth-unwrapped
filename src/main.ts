import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addressJoi } from './joi'

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/:address', (req, res) => {
    const validate = addressJoi.validate(req.params.address);
    if (validate.error) {
        res.status(400).send('Please enter a valid ethereum address');
        return;
    }
    res.send(`Hello ${req.params.address}`);
});

export default app;