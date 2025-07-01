const express = require("express");
const router = express.Router();
const {
  addAttraction,
  voteAttraction,
  getAttractionsByTrip,
} = require("../controllers/attractionController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, addAttraction);
router.put("/:attractionId/vote", protect, voteAttraction);
router.get("/trip/:tripId", protect, getAttractionsByTrip);

module.exports = router;
