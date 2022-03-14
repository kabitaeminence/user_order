const userData = require("../model/user")

// const create1 = async (req, res) => {
//     const {  name, email, password } = req.body;
//     const obj = {
//         name,
//         email,
//         password
//     }
//     const user = await userData.create(obj);
//     user.save()
//     res.send(user)
// }


const signup = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    const datastoring = {
      Name: req.body.Name,
      email: req.body.email,
      // number: req.body.number,
      // password: req.body.password
      password: pass
    };
    const data = await new userData(datastoring);
    //   console.log(data);

    const result = await userData.findOne({ email: data.email });
    if (result) {
      res.send("Email is alreaday taken  take another email or login ");
    }

    data.save();
    console.log(data)
    return res
      .status(200)
      .send({ status: 200, message: `sign up has suceesfully welcome ${datastoring.Name}` });
  } catch (err) {
    console.log("error", err);
    return res.status(500).send({ status: 500, message: "Something went wrong" });
  }
};


const login = async (req, res) => {
  const password = req.body.password;
  const data = await userData.findOne({ email: req.body.email });
  // console.log(data,"__________")

  if (data) {
    // console.log(data)
    const check_password = await bcrypt.compare(password, data.password);
    // console.log(check_password, "((((((((")
    if (check_password) {
      // const hash = "hhh";
      const token = jwt.sign({ _id: data._id }, "hash");

      console.log(data);
      console.log(token)

      // res.send(token);
      return res
        .status(200)
        .send({ status: true, message: `login successful ${data.Name} `, token: token });
    } else {
      return res.send("incorrect password");
    }
  } else {
    return res.status(404).send({ status: false, message: "User Not exist " });
  }
};


// get all data *************************************
const get = async (req, res) => {
    try {
        const user = await userData.find()
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}


// *****************  by usin in   $in operator**************

const get_mach_data = async(req,res)=>{
  try{
      const check_exist = await userData.find({Name:  {$in:["aman"]}})
     
      res.send(check_exist)
      console.log(check_exist)
  }catch(err){
      res.send(err)
  }
}

// how to use aggregation and lookup *************************************************************

// const get = async(req,res)=>{
//   try{
//     const data = await userData.aggregate([
//       {
//         $lookup: {
//           from: "userorders",
//           let: { userId: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [{ $eq: ["$userId", "$$userId"] }],
//                 },
//               },
//             },
//           ],
//           as: "userorders",
//         },
//       },
//       {
//         $lookup: {
//           from: "useraddressschemas",
//           let: { userId: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [{ $eq: ["$userId", "$$userId"] }],
//                 },
//               },
//             },
//           ],
//           as: "useraddress",
//         },
//       },
//     ]);
//     res.send(data);
//   }catch(err){
//       res.send(err)
//   }
// }


// // get all data -------------------------------------------------------

const get = async (req, res) => {
  let page = 1;
  let limit= 10;
  try {
    const user = await userData.find()
    // for skip and get id use below line-------------------------------pagination
    // .skip(3)
    // .skip((page-1)*limit)
    // .select("_id").limit(10)
    // .countDocuments()
    res.send(user)
    // console.log(user)
  } catch (error) {
    console.log(error)
  }
}

// // by id -----
// get data by id-------------------------
const getById = async(req,res)=>{
    try{
        const _id = req.params.id;
        const getMen = await userData.findById(_id)
        res.send(getMen);
    }catch(e){
        res.status(400).send(e)
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
module.exports = { signup, get, patchD, deleteDt, login ,getById , get_mach_data}

