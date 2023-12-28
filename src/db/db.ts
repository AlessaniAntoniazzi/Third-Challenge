import * as mongoose from 'mongoose';
import { config } from '../configDB/configDB';

export async function connectMongo() {
    try {
        const client = await mongoose.connect(config.mongo.uri, {
            retryWrites: true,
            w: 'majority',
        });

    console.log("Database connected");
    return client;

    }catch (err) {
        console.log('Error:', err);
        throw err;
    }
};