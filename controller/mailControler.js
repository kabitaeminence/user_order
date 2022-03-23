const express = require('express')
const app = express()
const multer = require('multer')

const image = require("../model/uplodeImage")

const update = async (req,res) =>{
    try {
        const data = req.files.map(async item =>{
            console.log(item.path);
            
            const result = await image.findOneAndUpdate({ image: item.path },{image:item.path,...req.body},{upsert:true,new:true});
            console.log(result);
          
        })
        res.send({status:200,message:"image data is saved",data})
        
    } catch (error) {
        res.send(error)
        
    }
 
}

const DIR = "./uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
    console.log("image uploded in the folder");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const uploadImg =  multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error("Please upload an Image!!"));
    }
    cb(undefined, true);
    console.log(req.file)
  },
});

const imageController = (req, res) => {
   
  try {
   console.log(req.file)

   console.log(req.body)
    update(req,res)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { uploadImg, imageController }





