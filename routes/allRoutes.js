const express = require("express");
const route = express.Router();
const { registration } = require("../controllers/register");
const { login } = require("../controllers/login");
const { verifyToken } = require("../middlewares/jwt");
const { transferPlayer } = require("../controllers/transferPlayer");
const { updatePlayer } = require("../controllers/updatePlayer");
const { updateTeam } = require("../controllers/updateTeam");
const { getTeam } = require("../controllers/getTeam");
const { getPlayers } = require("../controllers/getAllPlayer");

route.post("/register", registration);

route.post("/login", login);

route.get("/transferList", verifyToken, transferPlayer);

route.put("/updatePlayer/:id", verifyToken, updatePlayer);

route.put("/updateTeam/:id", verifyToken, updateTeam);

route.get("/getTeam/:id", verifyToken, getTeam);

route.get("/getAllPlayers", verifyToken, getPlayers);

module.exports = route;
