import express from 'express'
import bodyParser from 'body-parser'

// Router as middleware
let router = express.Router()

let parseUrlEncoded = bodyParser.urlencoded({extended: false})

let posts = {
    Java: "Programming Language",
    React: "Buzz language in 2017",
    Serverless: "Serverless computing"
}

router.route('/')
    .get((req, res) => {
        if(req.query.limit >= 0){
            res.json(Object.keys(posts).slice(0, req.query.limit))
        }else{
            res.json(Object.keys(posts))
        }
    })
    .post(parseUrlEncoded, (req, res) => {
        let newPost = req.body
        console.log("new:",newPost);
        if(!newPost.name){
            res.status(400).json("No Post name found")
        }
        posts[newPost.name] = newPost.description
        console.log("posts:",posts);
        
        res.status(201).json(newPost.name)
    })

router.route('/:name')
    .all((req, res, next) => {
        let name = req.params.name
        let post = name[0].toUpperCase() + name.slice(1).toLowerCase()
    
        req.postName = post
        next()
    })
    .get((req, res) => {
        let description = posts[req.postName]
        if(!description){
            res.status(404).json("No description found for "+req.params.name)
        }else{
            res.json(description)
        }
    })
    .delete((req, res) => {
        delete posts[req.postName]
        res.sendStatus(200)
    })

module.exports = router