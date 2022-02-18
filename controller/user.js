const userData = require("../model/user")

const create1 = async (req, res) => {
    const {  name, email, password } = req.body;
    const obj = {
        name,
        email,
        password
    }
    const user = await userData.create(obj);
    user.save()
    res.send(user)
}

const get = async (req, res) => {
    try {
        const user = await userData.find()
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}

const patchD = async (req, res) => {
    try {
        const _id = req.params.id;
        const getMen = await userData.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        // res.send(getMen);
        res.send("data update successfully")
    } catch (e) {
        res.status(500).send(e)
    }
}

const deleteDt = async (req, res) => {
    try {
        const _id = req.params.id;

        const getMen = await userData.deleteOne({ _id })
        //    res.send(getMen)
        res.send("data delete successfully")
    } catch (err) {
        res.status(500).send(err)
    }
}
module.exports = { create1, get ,patchD ,deleteDt}

