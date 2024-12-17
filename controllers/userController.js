//User info Controllers
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/userModel");

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
      }
  
      const user = await Users.find({ email });
      if(!user[0]){
       return res.status(400).json({ message: "Email does not exist" });
      }

      if (user.length === 0) {
        res.status(400);
        throw new Error("Invalid email or password");
      }
      res.cookie("id", user[0]._id, {
        HttpOnly: true,
        secure: true,
        // maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      });
    
      if (user && (await bcrypt.compare(password, user[0].password))) {
        const accessToken = jwt.sign(
            {
              user: {
                email: user[0].email,  // Include email in the token
              },
            },
            process.env.JWT_KEY,
            { expiresIn: "1d" }  // Token expires in 1 day
          );
        res.cookie("OsctToken", accessToken, {
          HttpOnly: true,
          secure: true,
          // maxAge: 24 * 60 * 60 * 1000,
          sameSite: "none",
        });
        
        res.status(200).json({ message: "login successful" });
      } else {
        res.status(400);
        throw new Error("email or password is not valid");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const logoutUser = (req, res) => {
  
    try {
      res.cookie("OsctToken", "", { maxAge: 0 });
      
      res.cookie("id", "", { maxAge: 0 });
      res.status(200).json({ message: "User logged out" });
    } catch (error) {
      res.status(400).json({ Message: error.message });
    }
  };
//@User Registeration for User
//@ Req POST
//@URL : /api/org/userrole
const userRegistration = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password ) {
        res.status(400);
        throw new Error("All fields are required");
      }
   
      // user existance in our database
      const isUserExist = await Users.findOne({ email });
      if (isUserExist) {
        res.status(400);
        throw new Error("User already exists");
      }
  
    //   const userInfoData = {
    //     name,
    //     role,
    //     _organization,
    //   };
    //   const userInfo = await UserInfo.create(userInfoData);
  
      //hash Passwrod
      const hashedPasswords = await bcrypt.hash(password, 10);
  
      const UserData = {
        name,
        email,
        password: hashedPasswords,
      };

      await Users.create(UserData);
  
      return res.status(200).json({
        message:
          "User created successfully.",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports = {
    loginUser,
    logoutUser,
    userRegistration,
  }