const express = require("express");
const router = express.Router();

//const { check, validationResult } = require("express-validator");

const { create, get, getById, update, deleteById } = require("../Controllers/placeController");

router.post("/", create);
router.get("/:id", getById);
router.get("/", get);
router.put("/:id", update);
router.delete("/:id", deleteById);

module.exports = router;