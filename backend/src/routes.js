const express = require("express");

const BuckController = require("./controllers/BuckController");
const InductorController = require("./controllers/InductorController");

const routes = express.Router();

routes.post("/buck", BuckController.index);
routes.post("/inductor", InductorController.index);

module.exports = routes;