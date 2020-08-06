const redis = require('../models/redis');

module.exports = (req, res, next) => {

	const key = `links_${req.user.userId}`
	
	redis.get(key, (err, data) => {

		if (err) {
			console.log(err);
			res.status(500).send(err);
		}

		if (data != null) {
			res.send(data);
		} else {
			next();
		}
	});

}