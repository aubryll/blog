import express from "express"
const mongoose = require("mongoose");
//const { requestLogger } = require("./middleware/logger");
const router = require("./routes");

const app = express();
mongoose.connect('mongodb://admin:pass@localhost:27888/?authMechanism=DEFAULT',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//app.use(requestLogger);
app.use(require("cors")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

module.exports = app;