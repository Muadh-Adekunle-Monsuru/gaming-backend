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
	const newO = new Order(newOrder);
	newO.save().then((res) => response.json(res));
});

app.delete('/orders/:id', async (req, response) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.id);
		if (!order) {
			return response.status(404).json({ message: 'Order not found' });
		}
		response.json({ message: 'Order deleted successfully' });
	} catch (e) {
		console.log('Error trying to delete', e);
		response.status(500).json({ message: e.message });
	}
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
