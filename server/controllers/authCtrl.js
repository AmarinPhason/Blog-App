import { AppError } from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import { setCookieOptions } from "../utils/cookieOptions.js";

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

export const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new AppError("Please enter all fields", 400));
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return next(new AppError("Email does not exist", 400));
    }
    const isMatch = await findUser.comparePassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid password", 400));
    }
    const { password: _password, ...otherDetails } = findUser._doc;
    const token = findUser.generateToken();
    res.status(200).cookie("access_token", token, setCookieOptions()).json({
      message: "Login successful",
      data: otherDetails,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// controller.js
export const googleLoginCtrl = async (req, res, next) => {
  const { email, displayName, photoURL } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      const token = user.generateToken();
      return res
        .status(200)
        .cookie("access_token", token, setCookieOptions())
        .json({
          message: "Login successful",
          data: user,
          token,
        });
    }

    if (!user) {
      user = new User({
        username: displayName,
        password: email + process.env.JWT_SECRET,
        email,
        picture: { url: photoURL },
      });

      await user.save();
    }

    const token = user.generateToken();
    res.status(200).cookie("access_token", token, setCookieOptions()).json({
      message: "Login successful",
      data: user,
      token,
    });
  } catch (error) {
    console.error("Error during Google login:", error); // เพิ่มการ log error
    next(error);
  }
};
