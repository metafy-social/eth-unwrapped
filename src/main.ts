import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addressJoi } from './joi'
import { metaScore } from "./lib";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/:address', async (req, res) => {
    const validate = addressJoi.validate(req.params.address);
    if (validate.error) {
        res.status(400).send('Please enter a valid ethereum address');
        return;
    }
    const [unwrapped, error] = await metaScore(req.params.address);
    if (error || !unwrapped) {
        console.log(error);
        res
            .status(500)
            .send('An unknown error occurred. Please try again later.');
        return;
    }
    res.json(unwrapped);
});

export default app;