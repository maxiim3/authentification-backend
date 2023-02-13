const {styles} = require("./styles")
module.exports = (title, content) => {
	return `
	<!DOCTYPE html>
	<html lang="fr">
 		<head>
 			<meta charset="UTF-8" />
   			<title>back-End | ${title}</title>
		</head>
		<body>
			${styles}
			<main class="container">
				<h1 class="title">${title}</h1>
				<section class="content">${content}</section>
			</main>
		</body>
	</html>
`
}
