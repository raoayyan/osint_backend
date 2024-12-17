const express = require("express");
const dataFetch = express.Router();

const { getJezzData } = require("../controllers/dataFetching");

dataFetch.post("/fetch", getJezzData);


module.exports = dataFetch;