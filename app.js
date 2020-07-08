const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const routes = require('./routes/auth.routes')

const app = express();

app.use('/api/auth', routes)

const PORT = config.get('port') || 5000

async function start () {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
	} catch (err) {
		console.log('Server error', err.message);
		process.exit();
	}
}

start();

app.listen(5000, () => console.log('App started on port', PORT))