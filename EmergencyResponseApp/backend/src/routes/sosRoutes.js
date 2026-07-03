const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSOS,
  getSOSHistory,
} = require("../controllers/sosController");

router.post("/", protect, createSOS);

router.get("/history", protect, getSOSHistory);

module.exports = router;