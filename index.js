const express = require('express')
const app = express()

var cors = require('cors')
app.use(cors())

app.get('/', function (req, res) {
  res.send("you're up !")
})

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

app.listen(3000,()=> console.log(`🚀 Server ready at http://localhost:3000/`))