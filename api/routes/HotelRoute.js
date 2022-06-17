import express from 'express';

import { 
	countByCity,
	countByType,
	createHotel,
	deleteHotel,
	getHotel,
	getHotels,
	updateHotel
} from '../controllers/HotelController';
import { verifyAdmin } from '../utils/verifyToken';

const app = express();

//CREATE
app.post('/', verifyAdmin, createHotel);

//UPDATE
app.put('/:id', verifyAdmin, updateHotel);

//DELETE
app.delete('/:id', verifyAdmin, deleteHotel);

//GET
app.get('/find/:id', getHotel);

//GET ALL
app.get('/', getHotels);

app.get('/countByCity', countByCity);
app.get('/countByType', countByType);
app.get('/', getHotels);

module.exports = app;