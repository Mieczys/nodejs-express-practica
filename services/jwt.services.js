const jwt = require('jsonwebtoken');

const generateToken = (info) => {
	const token = jwt.sign(info, process.env.JWT_SIGNATURE, {
		expiresIn: '1h',
	});
	return token;
};

async function validateToken(req, res, next) {
	const token = req.headers.authorization.split(' ')[1];

	try {
		const validation = jwt.verify(token, process.env.JWT_SIGNATURE);
		console.log('Token valido');
		console.log(validation);

		next();
	} catch (err) {
		console.log(`No se verifico correctamente el token jwt, ${err}`);
		res.status(401).send('Usuario sin autorización o token expirado');
	}
}

module.exports = { generateToken, validateToken };
