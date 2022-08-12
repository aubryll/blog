import express from "express"
import logger from "./middleware";
const mongoose = require("mongoose");
const router = require("./routes");

const app = express();
mongoose.connect('mongodb://admin:pass@localhost:27888/?authMechanism=DEFAULT',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(logger)
app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

module.exports = app;