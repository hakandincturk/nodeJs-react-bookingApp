import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
	// const token = req.cookies.access_token;
	// eslint-disable-next-line max-len
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTg5MGFhMjJmNjFiNDAxN2UwOGIxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTgyMzI0NywiZXhwIjoxNjU1OTA5NjQ3fQ.zRSRvyHi8fwtv8V7z7rAtY7eTP9DML5KjdrVmsFkvu0';

	console.log(token);

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