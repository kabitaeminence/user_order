const ControllerUser = require('../controller/user')

const {authenticateToken}= require('../middlewares/auth');

const { signup } = require("../middlewares/validator");

const nodemail = require("../nodeemail/nodeemail")

const express = require("express");

const router = express.Router();

router.post("/", ControllerUser.create1);

router.get("/insert", ControllerUser.insert_many);

// router.get("/",ControllerUser.get);


router.get("/search/:findUserName", ControllerUser.search);// search data by order name

router.get("/:id",authenticateToken,ControllerUser.getById); // for authenticateToken----------------------------------

router.get("/",authenticateToken,ControllerUser.get); // for authenticateToken-------------------------

router.get("/", ControllerUser.get);// get by usin in oprater--------------------------------------

router.patch("/:id",ControllerUser.patchD);

router.delete("/:id",ControllerUser.deleteDt)

router.post("/mail",nodemail.nodemail)

module.exports = router;
