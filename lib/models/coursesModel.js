const Joi = require("joi")
const {Schema} = require("mongoose")
const {coursesConnection} = require("../controller/coursesConnection")
const dotenv = require("dotenv")
dotenv.config()

const CourseSchema = new Schema({
	title: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 220,
		lowercase: true,
		unique: true,
	},
	author: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 220,
		lowercase: true,
		trim: true,
	},
	isPublished: {
		type: Boolean,
		default: false,
	},
	price: {
		type: Number,
		required: function () {
			return this.isPublished
		},
		min: 0,
		max: 150,
	},
	tags: {
		type: Array,
		validate: {
			validator: function (v) {
				return v && v.length > 0 && v.toLocaleString() // v is the array | v.length > 0 means that the array must have at least one element
			},
		},
	},
})

module.exports.CourseModel = coursesConnection.model("courses", CourseSchema)

module.exports.validateCourse = course => {
	const JoiSchema = Joi.object({
		title: Joi.string().min(3).max(220).required(),
		author: Joi.string().min(3).max(220).trim().required(),
		isPublished: Joi.boolean().default(false),
		price: Joi.number()
			.min(0)
			.max(150)
			.required(() => this.isPublished),
		tags: Joi.array().items(Joi.string()).min(1).required(),
	})

	return JoiSchema.validate(course)
}
