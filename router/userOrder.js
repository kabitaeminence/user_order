const controllerOrder = require('../controller/userOrder')

const express = require("express");

const router = express.Router();

router.post("/", controllerOrder.create);

router.post("/filter", controllerOrder.filterdata);

router.get("/search/:finnOrderName", controllerOrder.search);

router.get("/:id", controllerOrder.getById);

router.get("/", controllerOrder.get);

router.patch("/:id", controllerOrder.patchOrder);

router.delete("/:id", controllerOrder.deleteD)

module.exports = router;
