// backend/analyze.js
const express = require("express");
const router = express.Router();

router.post("/analyze-screenshot", async (req, res) => {
  const { image } = req.body;

  // TODO: send image to AI model here

  res.json({
    summary: "Screenshot analyzed",
    tokens: [],
    contracts: [],
    warnings: [],
    raw_text: ""
  });
});

module.exports = router;

