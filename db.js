const mongoose = require("mongoose");
console.log("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds123753.mlab.com:23753/kode24-julebase");
mongoose.connect("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds123753.mlab.com:23753/kode24-julebase");


const competitionsSchema = new mongoose.Schema({
  type: {type: String},
  name: {type: String},
  namespace: {type: String},
  participants: [
    {
      email: {type: String},
      name: {type: String},
      submitted: { type: Date, default: Date.now }
    }
  ]})

const Competitions = mongoose.model("competitions", competitionsSchema)

async function findAllCompetitions () {
  try {
    let competitions = await Competitions.find({});
    console.log(competitions);
    return competitions;
  }
  catch (error) {
    console.log(error);
    return false;
  }

  
}

module.exports = {
  findAllCompetitions: findAllCompetitions
}