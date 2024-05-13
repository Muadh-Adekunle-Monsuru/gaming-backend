const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { Order } = require('./mongo');

app.get('/orders', (req, res) => {
	Order.find({}).then((orders) => {
		res.json(orders);
	});
});

app.post('/orders', (req, response) => {
	let newOrder = req.body;
	console.log(newOrder);
	const newO = new Order(newOrder);
	newO.save().then((res) => response.json(res));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
