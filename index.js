const fs = require('fs');
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()

var cors = require('cors')
app.use(cors())
// Use body-parser middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Use body-parser middleware to parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send("you're up !")
})

// user endpoints

app.get('/users', function (req, res) {
    const users=require('./api/userDB')
    res.json(users).status(200)
  })

app.get('/users/:id', function (req, res) {
    const userId=req.params?.id
    const {getSingleUser}=require('./api/singleUser')
    const user=getSingleUser(parseInt(userId))
    res.json(user).status(200)
  })


// post endpoints

app.post('/posts', function (req, res) {
  const projectFolder = path.resolve(__dirname);
  const postDBPath = path.join(projectFolder, '/api/post/postDB.json');
  const data=fs.readFileSync(postDBPath,'utf8')

  const posts=JSON.parse(data)

  const lastItem=posts.data.length


  const newData=[...posts.data]
  newData.push({
    postId:lastItem+1,
    title:req.body?.title,
    content:req.body?.content,
  })


  fs.writeFile(postDBPath, JSON.stringify({data:newData}), 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Data has been written to file successfully.');
    }
});


  res.json({message:"post created !"}).status(200)
})


app.delete('/posts/:id', function (req, res) {

  const projectFolder = path.resolve(__dirname);
  const postDBPath = path.join(projectFolder, '/api/post/postDB.json');
  const data=fs.readFileSync(postDBPath,'utf8')

  const postId=req.params?.id
  const posts=JSON.parse(data)

  const filteredPosts = posts.data.filter((post)=>post.postId!==parseInt(postId))
  const fileData={
    data: filteredPosts
  }

  fs.writeFile(postDBPath, JSON.stringify(fileData), 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Data has been written to file successfully.');
    }
});


  res.json({message:"post deleted successfully !"}).status(200)
})

app.get('/posts', function (req, res) {
  
  const projectFolder = path.resolve(__dirname);
  const postDBPath = path.join(projectFolder, '/api/post/postDB.json');
  const data=fs.readFileSync(postDBPath,'utf8')

    const posts=JSON.parse(data)
  res.json(posts.data).status(200)
})


app.get('/posts/:id', function (req, res) {
  const postId=req.params?.id
  const {getSinglePost}=require('./api/post/singlePost')
  const post=getSinglePost(parseInt(postId))
  res.json(post).status(200)
})

app.listen(3000,()=> console.log(`🚀 Server ready at http://localhost:3000/`))