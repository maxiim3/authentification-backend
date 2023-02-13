function deployApp() {
	// ...
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `Hello ${name}, your function executed successfully!`,
		}),
	}
}

module.exports = deployApp
