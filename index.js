require('dotenv').config()

console.log(process.env);
const app = require('express')()
const db = require('./db.js')
const port = 3000

app.get("/api", async (req,res) => {
  console.log('hest');
  var competitions = await db.findAllCompetitions();
  res.send(competitions);
  
});

app.listen(port, () => { console.log(`running on port ${port}`)})


