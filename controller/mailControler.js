const express = require('express')
const app = express()
const multer  = require('multer')

const uplodeImg = require("../multer/multer")

const DIR = "./uploads";

const storeFile = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const uploadImg = multer({
  storage: storeFile,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error("Please upload an Image!!"));
    }
    cb(undefined, true);
  },
});

const imageController=(req,res)=>{
  console.log(req.body)
  try {
    return res.send({message:"Hello"})
  } catch (error) {
    console.log(error)
  }
}

  module.exports={uploadImg,imageController}
  
 
