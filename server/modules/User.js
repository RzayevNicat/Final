const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: [ true, 'Please Provide a name' ] },
	email: {
		type: String,
		required: true,
		unique: [ true, 'Please try differant email' ],
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email' ]
	},
	role: {
		type: String,
		default: 'user',
		enum: [ 'user', 'admin' ]
	},
	password: {
		type: String,
		minlength: [ 6, 'minimum length : 6' ],
		required: [ true, 'Plesae Provide a password' ],
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String
	},
	about: {
		type: String
	},
	place: {
		type: String
	},
	website: {
		type: String
	},
	src: {
		type: String,
		default: 'https://logodix.com/logo/1070509.png'
	},
	blocked: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('User', userSchema);
