module.exports.styles = `
			<style>
				body{
					display: grid;
					place-content: center;
					background: #edeaea;
				}
				.container {
					display: flex;
					flex-flow: column;
					text-align: center;
					gap: 8px;
					justify-content: center;
					width: 350px;
					height: 320px;
					border-radius: 12px;
					background-color: #f8f4f4;
					box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
				}
				
				.title {
					font-size: 1.5rem;
					font-weight: 600;
					color: orange;
				}
				
				.content {
					font-size: 1rem;
					font-weight: 400;
					color: black;
				}
			</style>
`
