const Joi = require("joi")

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
