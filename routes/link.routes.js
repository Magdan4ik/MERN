const { Router } = require('express');
const redis = require('../models/redis');
const config = require('config');
const shortId = require('shortid');
const Link = require('../models/link');
const authMiddleware = require('../middleware/auth.middleware');
const linksCacheMiddleware = require('../middleware/links.cache.middleware');
const router = Router();

router.post('/generate', authMiddleware, async(req, res) => {
	try {
		const baseUrl = config.get('baseUrl');
		const {from} = req.body;
		const code = shortId.generate();

		const linkExist = await Link.findOne({from})


		if(linkExist) {
			return res.json({link: linkExist})
		}

		const to = baseUrl + '/t/' + code;


		const link = new Link({
			code, to, from, owner: req.user.userId
		})

		console.log(link)

		await link.save()

		res.status(201).json({link})

	} catch (err) {
		res.status(500).json({message: 'Что-то пошло не так...'})
	}
})

router.get('/', [authMiddleware, linksCacheMiddleware], async(req, res) => {
	try {
		const  { userId } = req.user;
		const links = await Link.find({ owner: userId}) // ???

		redis.setex(`links_${userId}`, 3600, JSON.stringify(links));

		res.json(links)

	} catch (err) {
		res.status(500).json({message: 'Что-то пошло не так...'})
	}
})

router.get('/:id', authMiddleware, async(req, res) => {
	try {
		const links = await Link.findById(req.params.id);
		res.json(links);
	} catch (err) {
		res.status(500).json({message: 'Что-то пошло не так...'})
	}
})

module.exports = router;