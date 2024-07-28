import { AppError } from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";

export const registerCtrl = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return next(new AppError("Please enter all fields", 400));
    }
    if (password.length < 6) {
      return next(new AppError("Password must be at least 6 characters", 400));
    }
    if (username.length < 7) {
      return next(new AppError("Username must be at least 7 characters", 400));
    }
    const findUser = await User.findOne({ email });
    if (findUser) {
      return next(new AppError("Email already exists", 400));
    }
    const findUsername = await User.findOne({ username });
    if (findUsername) {
      return next(new AppError("Username already exists", 400));
    }
    const newUser = await User.create({ username, email, password });
    const { password: _password, ...otherDetails } = newUser._doc;
    res.status(201).json({
      message: "User created successfully",
      data: otherDetails,
    });
  } catch (error) {
    next(error);
  }
};
