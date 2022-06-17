import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token;

	if (!token) 
		return res.status(400).json({type: false, message: 'not authanticated'});
  
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err)
			return res.status(400).json({type: false, message: 'invalid token'});

		req.user = user; 
		next();
	});
};

export const verifyUser = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) 
			next();
		else
			return res.status(400).json({type: false, message: 'you are not authanticated'});
	});
};

export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.isAdmin) 
			next();
		else
			return res.status(400).json({type: false, message: 'you are not admin'});
	});
};