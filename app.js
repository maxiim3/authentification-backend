// Create an express app
const express = require('express');
// Load Joi
const Joi = require('joi');
// Load env variables
const dotenv = require('dotenv');
// get paths
const config = require('./config.json');
// Posts
const {posts, htmlTemplate} = require('./Posts');

const app = express()
app.use(express.json())
dotenv.config();
const PORT = process.env.PORT || 3001


// Create Root Route
app.get(config.paths.root, (req, res) => {
    res.send("<h1>Root Page</h1>")
})


app.get(`${config.paths.posts}/:id?`, (req, res) => {
    const paramId = parseInt(req.params.id)
    const requestedPost = posts.find(({id}) => id === paramId)
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.valid(req.body, schema)
    console.log(result)

    if (!requestedPost)
        return res.status(404).send("The post with the given ID was not found.")

    return res.send(requestedPost.title)
})

app.post(config.paths.posts, (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.valid(req.body, schema)
    console.log(result)

        const post = {
            id: posts.length + 1,
            title: req.body
        }
        posts.push(post)
        res.send(post)
})

// Start the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})