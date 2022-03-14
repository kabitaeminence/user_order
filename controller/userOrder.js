const UserOrder = require("../model/userOrder")

const create = async (req, res) => {
    const {userId , addressId, OrderQuentity,OrderPrice ,OrderName } = req.body;
    const obj = {
        userId,
        addressId,
        OrderName,
        OrderQuentity,
        OrderPrice
    };
    const userorder1 = await UserOrder.create(obj);
    userorder1.save()
    res.send(obj)
}

// get data by id ****************************************************************
  
const get = async (req, res) => {
    try {
        const users = await UserOrder.find().populate("userId").populate("addressId");
        res.send(users)
    } catch (error) {
        console.log(error)
    }
}


// ***********sorting Ascending or Decending Order by************************************************
// const get=async(req,res)=>{

//     try{
//         // const greaterthan=await UserOrder.find({ OrderPrice : { $gt :  2000}})
//         const lessthan=await UserOrder.find({ OrderQuentity : { $lt :  2 }})

//         // res.send(greaterthan)
//         res.send(lessthan)
//     }catch(err){
//         res.send("Not Found")
//     }
// }


const filterdata = async (req, res) => {
    const data = req.body;

    let query = {};

    let limit = req.body.limit || 10;
    let skip = req.body.skip || 1;
    
    let addressObj = {}
    if (data.OrderQuentity) query.OrderQuentity = { $gt: data.OrderQuentity }
    if (data.OrderPrice) query.OrderPrice = { $gt: data.OrderPrice }
    if (data.state) addressObj.state = { $in: data.state }

    const count =await UserOrder.countDocuments(query)


    const filterData = await UserOrder.find(query).populate({path:"addressId",match:addressObj}).limit(limit).skip((skip-1) * limit)
    console.log(filterData)
    res.json ({data:filterData,totalCount:count})
    }



const search = async (req, res) => {
    //onst { page } = req.params;
    const { finnOrderName } = req.params;
    //const page=req.params.page
    //const numbers = await users.count();
    try {
        const data = await UserOrder.find({
            $or: [{ OrderName: { $regex: String(finnOrderName), $options: "i" } }],
        });
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};





const patchOrder = async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen = await UserOrder.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        // res.send(getMen);
        res.send("data update successfully")
    } catch (e) {
        res.status(500).send(e)
    }
}

const deleteD = async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen = await UserOrder.deleteOne({ _id })
        //    res.send(getMen)
        res.send("data delete successfully")
    } catch (err) {
        res.status(500).send(err)
    }
}
module.exports = { create, get , patchOrder, deleteD}
