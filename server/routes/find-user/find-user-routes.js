const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller")
const { getUserById } = require("../../controllers/find-user/find-user-controller");

const router = express.Router();

router.get("/user/:id", authMiddleware, getUserById);

module.exports = router;
