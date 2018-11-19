require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
const db = require('./db.js')
const port = 3000

app.use(bodyParser.json())

const checkUser = function (req,res,next) {
  if(req.headers.username && req.headers.password) {
    db.findUserByUsernameAndPassword(req.headers.username, req.headers.password, (user) => {
      if(user) {
        req.user = user;
        next();
      } else {
        res.send(401, 'user does not exist');
      }
      
    })
  } else {
    res.send(400, 'missing authorization header');
  }
  
}

app.get("/course/list", async (req,res) => {
  console.log('hest', req);
  res.send({});
  
})

app.post("/course", checkUser, async (req,res) => {
  console.log('hest', req);
  res.send(req.user);
  
})

app.listen(port, () => { console.log(`running on port ${port}`)})


