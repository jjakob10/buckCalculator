const express = require("express");

const OngController = require("./controllers/BuckController");

const routes = express.Router();

routes.post("/buck", OngController.index);

module.exports = routes;