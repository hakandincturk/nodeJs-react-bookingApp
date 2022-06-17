import User from '../models/User';

export const updateUser = async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
		res.status(200).json({type: true, message: 'succesfull', data: updatedUser});
	}
	catch (error) {
		next(error);
	} 
};

export const deleteUser = async (req, res) => {
	try {
		await User.findOneAndDelete(req.params.id);
		res.status(200).json({type: true, message: 'succesfull'});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json({type: true, message: 'succesfull', data: user});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({type: true, message: 'succesfull', data: users});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	} 
};
