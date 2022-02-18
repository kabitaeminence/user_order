const express = require('express')
const app = express()
app.use(express.json())


const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/UserOrder", {
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiesTopology:true
}).then(() => {
    console.log("connection is successfully")
}).catch((err) => {
    console.log("no connection")
})

const userRouter = require('./router/user')
const UserOrderRouter= require("./router/userOrder")
const useraddres = require("./router/userAddress")


app.use(express.json());

app.use('/address',useraddres)

app.use('/OrderId',UserOrderRouter)

app.use('/users', userRouter);

app.listen(8000, (err) => {
    if (err) throw err;
    console.log('Server is running port number 8000--')
});


