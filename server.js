const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");

// Load environmental variables
const result = require("dotenv").config();

if (result.error) {
    throw result.error;
}

// Start Express App
const app = express();
app.use(bodyParser.json());

// Configure and connect to Mongo
const db = require("./config/keys").mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to Mongo!"))
    .catch(err => console.log(err));

// Routes
app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
