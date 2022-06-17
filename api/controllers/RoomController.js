import Room from '../models/Room';
import Hotel from '../models/Hotel';

export const createRoom = async (req, res) => {
	const hotelId = req.params.hotelid;
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();
		await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

		res.status(200).json({type: true, message: 'successful', data: savedRoom});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	}
};

export const updateRoom = async (req, res) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
		res.status(200).json({type: true, message: 'succesfull', data: updatedRoom});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const deleteRoom = async (req, res) => {
	try {

		const hotelId = req.params.hotelid;

		await Hotel.findByIdAndUpdate(hotelId, {
			$pull: { rooms: req.params.id }
		});
		await Room.findOneAndDelete(req.params.id);
		res.status(200).json({type: true, message: 'succesfull'});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const getRoom = async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json({type: true, message: 'succesfull', data: room});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	}
};

export const getRooms = async (req, res) => {
	try {
		const rooms = await Room.find();
		res.status(200).json({type: true, message: 'succesfull', data: rooms});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};
