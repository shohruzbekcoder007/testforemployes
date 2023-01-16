const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const app = express();

const port = process.env.PORT || 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('MY SECRET'));
app.use(cors({
  origin: '*',
  credentials: true,
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

app.use(express.static('./static'))
app.set("view engine", "pug")

const uri = 'mongodb://localhost:27017/test'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

mongoose.set('strictQuery', false)

mongoose.connect(uri, options, (err, db) => {
  if (err) console.error(err);
  else console.log("database connection")
})

app.get("/", (req,res) => {
  return res.render("main1", {})
})

app.listen(port, ()=> {
  console.log(`Application is up and running under localhost:${port}`)
})