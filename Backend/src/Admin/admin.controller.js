const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("./admin.model");
// const { transporter } = require("../connection/mailConnection");
require("dotenv").config();

//admin registration
const adminRegistration = async (req, res) => {
    // Extract admin registration data from the request body
    const { name, village, shopName, mobile, password } = req.body;

    console.log(req.body);

    if(!name){
      console.log("All fields");
      return res.status(400).send({ message: 'All fields are required' });
  }

  if(password.length < 6){
   console.log("less 6"); 
      return res.status(400).send({ message: 'Password must be at least 6 characters' });
  }

  AdminModel.findOne({ name: name })
  .then((existingUser) => {

    console.log("Inside , ",existingUser);
    if (existingUser) {
      if (existingUser.name === name) {
        res.status(400).json({ message: "user already exists" }); 
      }
    }
     else {
      AdminModel.create({ name, village, shopName, mobile, password })
        .then((user) => {
          res.status(201).json({ message: "User created successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: err.message })
        }
        ); 
    }
  })
  .catch((err) => res.status(500).json({message:err.message}));
}


// admin login
const adminLogin = async (req, res) => {
  try {
    // Extract login credentials from the request body
    const { mobile, password } = req.body;
    console.log(req.body)

    // Find the admin with the specified email
    const admin = await AdminModel.findOne({ mobile });

    console.log("Admin ",admin);
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    // const passwordMatch = await bcrypt.compare(password, admin.password);
    
    // if (!passwordMatch) {
    //   return res.status(401).json({ error: "Invalid email or password" });
    // }

    // Generate a unique token upon successful login
    // const token = jwt.sign(
    //   { userId: admin._id },
    //   process.env.TOKEN_API_SECRET_KEY,
    //   { expiresIn: "3h" }
    // );

    // Respond with the generated token
    res.status(200).send({ msg: "Loign successfully done" });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(400).json({ error: error.message });
  }
};

const message = async (req, res) => {
  const { name, email, message } = req.body;


  const mailOptions = {
    from: process.env.SMTP_EAMIL, // Replace with your email
    to: `${email}`, // Replace with the recipient's email
    subject: "Milkify Message ",
    text: `Hi i'am ${name}\n${message}`,
  }

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    } else {
      res.status(201).send(`Message send successfully! Email sent. ${info.response}`);
      
    }
  });
};


module.exports = {
  adminRegistration,
  adminLogin,
  message,
};
