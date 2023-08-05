import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";

import jwt from "jsonwebtoken";

export const registerController = async (req,res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
     //register user
     const hashedPassword = await hashPassword(password);
     //save
     const user = await new userModel({
       name,
       email,
       phone,
       address,
       password: hashedPassword,
       answer
     }).save();
 
     res.status(201).send({
       success: true,
       message: "User Register Successfully",
       user,
     });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}


export const loginController = async (req,res) =>{
    try {
        const {email, password} = req.body;
    if(!email || !password){
       return res.status(400).send({
            success: false,
            message: "Invalid Email or Password"
        })
    }
    //check user
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).send({
            success: false,
            message: "Email is not Registered"
        })
    }
    const match = await comparePassword(password, user.password)
    if(!match){
        return res.status(400).send({
            sucess: false,
            message: "Invalid Password"
        })
    }

    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "365d"} );

    res.status(200).send({
        success: true,
        message: "Login Successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
        },
        token
    })
    } catch (error) {
       res.status(500).send({
        success: false,
        message: "Error in Login",
        error
       }) 
    }
    
}

export const forgotPasswordController = async (req,res) => {
  try {
    const {email, answer, newPassword} = req.body;
  //validations
  if (!email) {
    return res.send({ message: "Email is Required" });
  }
  if (!answer) {
    return res.send({ message: "Answer is Required" });
  }
  if (!newPassword) {
    return res.send({ message: "New Password is Required" });
  }
  //check user

  const user = await userModel.findOne({email, answer})
  if(!user){
    return res.status(404).send({
      success: false,
      message: "Wrong Email or Answer"
    })
  }
  const hashed = await hashPassword(newPassword);
  await userModel.findByIdAndUpdate(user._id, {password: hashed});
  res.status(200).send({
    success: true,
    message: "Password Reset Successfully"
  })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      error,
      success: false,
      message: "Something Went Wrong"
    })
  }
  
}

//test controller
export const testController = (req,res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
}


//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};