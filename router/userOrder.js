const controllerOrder = require('../controller/userOrder')

const express = require("express");

const router = express.Router();

router.post("/", controllerOrder.create);

router.get("/:id",controllerOrder.get);

router.patch("/:id",controllerOrder.patchOrder);

router.delete("/:id",controllerOrder.deleteD)

module.exports = router;