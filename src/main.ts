import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addressJoi } from './joi'
import { metaScore } from "./lib";
import UnwappedModel from './schema/unwapped.schema';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/:address', async (req, res) => {
    const validate = addressJoi.validate(req.params.address);
    if (validate.error) {
        res.status(400).send('Please enter a valid ethereum address');
        return;
    }
    const savedData = await UnwappedModel.findById(req.params.address);
    if (savedData) {
        res.json(savedData);
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
    res.json({
        _id: req.params.address,
        ...unwrapped
    });
    const newDataToSave = new UnwappedModel({
        _id: req.params.address,
        ...unwrapped,
    });
    await newDataToSave.save();
});

export default app;