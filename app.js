import express from 'express'
// import bodyParser from 'body-parser'
import logger from './logger';

const app = express() //application instance

// let parseUrlEncoded = bodyParser.urlencoded({extended: false})

// let posts = {
//     Java: "Programming Language",
//     React: "Buzz language in 2017",
//     Serverless: "Serverless computing"
// }

app.use(logger)
app.use(express.static('public'))

// Moved to posts router .all
// app.param('name', (req, res, next) => {
//     let name = req.params.name
//     let post = name[0].toUpperCase() + name.slice(1).toLowerCase()

//     req.postName = post
//     next()
// })

let posts = require('./routes/posts')
app.use('/posts', posts)

//================= Chaining using route ======================
// app.route('/posts')
//     .get((req, res) => {
//         if(req.query.limit >= 0){
//             res.json(Object.keys(posts).slice(0, req.query.limit))
//         }else{
//             res.json(Object.keys(posts))
//         }
//     })
//     .post(parseUrlEncoded, (req, res) => {
//         let newPost = req.body
//         console.log("new:",newPost);
//         if(!newPost.name){
//             res.status(400).json("No Post name found")
//         }
//         posts[newPost.name] = newPost.description
//         console.log("posts:",posts);
        
//         res.status(201).json(newPost.name)
//     })

// app.route('/posts/:name')
//     .get((req, res) => {
//         let description = posts[req.postName]
//         if(!description){
//             res.status(404).json("No description found for "+req.params.name)
//         }else{
//             res.json(description)
//         }
//     })
//     .delete((req, res) => {
//         delete posts[req.postName]
//         res.sendStatus(200)
//     })

// ========= Normal way ==================

// app.post('/posts', parseUrlEncoded, (req, res) => {
//     let newPost = req.body
//     console.log("new:",newPost);
//     if(!newPost.name){
//         res.status(400).json("No Post name found")
//     }
//     posts[newPost.name] = newPost.description
//     console.log("posts:",posts);
    
//     res.status(201).json(newPost.name)
// })

// app.delete('/posts/:name', (req, res) => {
//     delete posts[req.postName]
//     res.sendStatus(200)
// })

// app.get('/posts', (req, res) => {
//     if(req.query.limit >= 0){
//         res.json(Object.keys(posts).slice(0, req.query.limit))
//     }else{
//         res.json(Object.keys(posts))
//     }
// })

// Dynamic route
// app.get('/posts/:name', (req, res) => {
//     let description = posts[req.postName]
//     if(!description){
//         res.status(404).json("No description found for "+req.params.name)
//     }else{
//         res.json(description)
//     }
// })

app.get('/hello', (req, res) => {
    res.send("Hello world")
})

app.listen(3001, () => {
    console.log("Server listening on port 3001.")
})