const express = require("express");
const securityTrails = express.Router();

const {getDataFromSecurityTrails} = require("../controllers/securitryTrails")

securityTrails.post("/fetch", getDataFromSecurityTrails);

module.exports = securityTrails;