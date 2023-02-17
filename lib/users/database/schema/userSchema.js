import {Schema} from "mongoose"

const jwt = require("jsonwebtoken")

module.exports.Schema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 220,
		trim: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 255,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 1024,
		trim: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	methods: {
		// We add a method to the UserSchema. We use the function syntax to be able to use the "this" keyword
		generateAuthToken: async function () {
			return await jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT)
		},
	},
})
