
async function create(props, Model) {
	const newInstance = new Model(props)

	const result = await newInstance.save()
	return result
}

module.exports.create = create