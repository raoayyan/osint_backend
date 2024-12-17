const mongoose = require("mongoose");

const getJezzData = async (req, res) => {
    console.log("hitting")
  const { phone } = req.body;
  if (!phone) {
    res.status(400);
    throw new Error("Enter the phone Number");
  }
  // Access the jezzdata collection directly
  const jezzdataCollection = mongoose.connection.collection("jezzdata");

  // Find the user with the specified phone number
  const user = await jezzdataCollection.findOne({ tel: phone });

  
  return res.status(200).json(user);
};

module.exports = {
  getJezzData,
};
