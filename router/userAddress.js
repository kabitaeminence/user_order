const express = require("express");

const controllerAddress= require("../controller/userAddress")

const router = express.Router();

router.post("/",controllerAddress.create);
   
router.get("/:id",controllerAddress.getD);

router.patch("/:id",controllerAddress.patchDa);

router.delete("/:id",controllerAddress.deleteda);

module.exports = router;