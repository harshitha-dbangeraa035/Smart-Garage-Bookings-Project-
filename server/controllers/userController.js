import User from "../models/User.js";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find({
      role: "customer",
    }).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Mechanics
export const getAllMechanics = async (req, res) => {

    try {

        const mechanics = await User.find({
            role: "mechanic"
        }).select("-password");

        res.status(200).json({
            success: true,
            mechanics
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};