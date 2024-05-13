require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

mongoose
	.connect(url)
	.then(() => console.log('Connection to MongoDD Successful ✅'))
	.catch((err) => console.log(err));

const orderSchema = new mongoose.Schema({
	personal: {
		name: String,
		email: String,
		phone: String,
	},
	plan: {
		name: String,
		price: String,
		monthly: Boolean,
		yearly: Boolean,
	},
	addOns: {
		'Online service': {
			selected: Boolean,
			price: String,
		},
		'Larger storage': {
			selected: Boolean,
			price: String,
		},
		'Customizable profile': {
			selected: Boolean,
			price: String,
		},
	},
	finalPrice: Number,
	complete: Boolean,
});
// orderSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString();
// 		delete returnedObject.__v;
// 	},
// });

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };
