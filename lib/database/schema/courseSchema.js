import {Schema} from "mongoose"

module.exports.Schema =  new Schema({
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