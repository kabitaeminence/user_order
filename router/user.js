const ControllerUser = require('../controller/user')

const {authenticateToken}= require('../middlewares/auth');

const express = require("express");

const router = express.Router();

router.post("/", ControllerUser.create1);

// router.get("/",ControllerUser.get);

router.get("/:id",authenticateToken,ControllerUser.getById);


router.get("/",authenticateToken,ControllerUser.get);

router.patch("/:id",ControllerUser.patchD);

router.delete("/:id",ControllerUser.deleteDt)

module.exports = router;
