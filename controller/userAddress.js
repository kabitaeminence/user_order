const userAddre = require("../model/UserAddress")

const create = async (req, res) => {
    const {city, state, pin ,userId} = req.body;
    const obj = {
        userId,
        city,  
        state,
        pin
    }
    const user = await userAddre.create(obj);
    user.save()
    res.send(user)
}
  
const getD = async (req, res) => {
    try {
        const users = await userAddre.find().populate('userId')
        return res.status(200).json(users)
        
    } catch (error) {
        console.log(error)
    }
}
const patchDa = async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen = await userAddre.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        // res.send(getMen);
        res.send("data update successfully")
    } catch (e) {
        res.status(500).send(e)
    }
}

const deleteda = async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen = await userAddre.deleteOne({ _id })
        //    res.send(getMen)
        res.send("data delete successfully")
    } catch (err) {
        res.status(500).send(err)
    }
}
module.exports = { create, getD, patchDa, deleteda}