const express = require("express");
const router = express.Router();

//const { check, validationResult } = require("express-validator");

const {
    createFee,
    getFee,
    getFees,
    updateFee,
    deleteFee
    } = require("../Controllers/feeController");

router.post("/", createFee);
router.get("/:id", getFee);
router.get("/", getFees);
router.put("/:id", updateFee);
router.delete("/:id", deleteFee);

module.exports = router;