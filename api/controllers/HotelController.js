import Hotel from '../models/Hotel';

export const createHotel = async (req, res) => {
	const newHotel = new Hotel(req.body);
  
	try {
		const savedHotel = await newHotel.save();
		res.status(200).json({type: true, message: 'succesfull', data: savedHotel});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	}
};

export const updateHotel = async (req, res) => {
	try {
		const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
		res.status(200).json({type: true, message: 'succesfull', data: updatedHotel});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const deleteHotel = async (req, res) => {
	try {
		await Hotel.findOneAndDelete(req.params.id);
		res.status(200).json({type: true, message: 'succesfull'});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const getHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		res.status(200).json({type: true, message: 'succesfull', data: hotel});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const getHotels = async (req, res) => {

	const {min, max, ...others} = req.query; 

	try {
		const hotels = await Hotel.find({
			...others,
			cheapestPrice: {$gt: min | 1, $lt: max || 999}
		}).limit(req.query.limit);
		res.status(200).json({type: true, message: 'succesfull', data: hotels});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const countByCity = async (req, res) => {
	try {
		const cities = req.query.cities.split(',');

		// eslint-disable-next-line no-undef
		const list = await Promise.all(cities.map(city => {
			return Hotel.countDocuments({city: city});
		}));
		res.status(200).json({type: true, message: 'succesfull', data: list});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const countByType = async (req, res) => {
	try {

		const hotelCount = await Hotel.countDocuments({type: 'hotel'});
		const aparmentCount = await Hotel.countDocuments({type: 'aparment'});
		const resortCount = await Hotel.countDocuments({type: 'resort'});
		const villaCount = await Hotel.countDocuments({type: 'villa'});
		const cabinCount = await Hotel.countDocuments({type: 'cabin'});

		res.status(200).json({
			type: true,
			message: 'succesfull',
			data: [ 
				{ type: 'hotels', count: hotelCount }, 
				{ type: 'aparments', count: aparmentCount }, 
				{ type: 'resorts', count: resortCount }, 
				{ type: 'villas', count: villaCount }, 
				{ type: 'cabins', count: cabinCount } 
			]});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};
