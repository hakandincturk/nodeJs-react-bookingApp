import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createError } from '../utils/error';

export const register = async (req, res, next) => {
	try {

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash
		});

		await newUser.save();
		res.status(200).json({type: true, message: 'successful', data: newUser});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({username: req.body.username});
		if (!user) return next(createError(404, 'wrong password or username!!'));
    
		const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
		if (!isPasswordCorrect)
			return next(createError(404, 'wrong password or username'));

		const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: 86400});

		const {password, isAdmin, ...otherDetails } = user._doc;

		res
			.cookie('access_token', token, {httpOnly: true})
			.status(200)
			.json({type: true, message: 'successfull', data: otherDetails});
	}
	catch (error) {
		res.status(400).json({type: false, message: error.message});
	}
};