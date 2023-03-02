import { model, Schema, Document } from 'mongoose';
import { UserData } from '@/interfaces/user-data.interface';

const userDataSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

const userDataModel = model<UserData & Document>('UserData', userDataSchema);

export default userDataModel;
