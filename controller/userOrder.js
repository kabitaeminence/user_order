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

const get = async (req, res) => {
    try {
        const users = await UserOrder.find().populate("userId").populate("addressId");
        res.send(users)
    } catch (error) {
        console.log(error)
    }
}

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