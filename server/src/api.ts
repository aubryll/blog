import * as express from "express"

const app = express();

app.use(require("cors")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


module.exports = app;
