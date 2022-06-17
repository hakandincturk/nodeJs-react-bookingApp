import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import {success, error} from 'consola';

import AuthRoute from './routes/AuthRoute';
import UserRoute from './routes/UserRoute';
import HotelRoute from './routes/HotelRoute';
import RoomRoute from './routes/RoomRoute';

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		success({message: 'connected to mongoDB.', badge: true});	
	}
	catch (err) {
		throw err;
	}
};

mongoose.connection.on('disconnected', () => {
	error({message: 'mongoDB disconnected', badge: true});
});

//middlewares
app.use('/api/auth', AuthRoute);
app.use('/api/users', UserRoute);
app.use('/api/hotels', HotelRoute);
app.use('/api/rooms', RoomRoute);

app.listen(8800, () => {
	connectDb();
	success({message: 'connected to backendd!', badge: true});
});