import express from 'express';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/RoomController';

import { verifyAdmin } from '../utils/verifyToken';

const app = express();

//CREATE
app.post('/:hotelid', verifyAdmin, createRoom);

//UPDATE
app.put('/:id', verifyAdmin, updateRoom);

//DELETE
app.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

//GET
app.get('/:id', getRoom);

//GET ALL
app.get('/', getRooms);

module.exports = app;