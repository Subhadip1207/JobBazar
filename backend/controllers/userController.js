import User from "../models/userModel.js";
import bcrypt from "bcryptjs"; // for hashing password
import jwt from "jsonwebtoken"; // used to create and verify tokens for authentication.
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from 'streamifier';
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }
    const hashedPasswored = await bcrypt.hash(password, 10); //10 is for salt
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPasswored,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    //check for the role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    }); //generates sign token

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie expires in 1 day
        httpsOnly: true, // Cookie can't be accessed by JavaScript on the client (security)
        sameSite: "strict", // Cookie is only sent for same-site requests (CSRF protection)
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    //cloudinary file setup here later
    const fileUri = getDataUri(file);

    let cloudResponse = null;
    if (file) {
      cloudResponse = await new Promise((resolve, reject) => { //download the resume in your device
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw', // must be raw for PDF/doc uploads
            folder: "resumes" // optional: organize files in Cloudinary
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    }

    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",").map(s => s.trim());//converting skills string to array
    }

    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }
    //updating data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume comes later here
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url ///set the cloudinary url
      user.profile.resumeOriginalName = file.originalname //save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: {
        bio: user.profile.bio,
        skills: [...user.profile.skills],
        resume: user.profile.resume || null,
        resumeOriginalName: user.profile.resumeOriginalName || null,
        profilePhoto: user.profile.profilePhoto || null,
      },
    };

    console.log("Updated user returned to frontend:", user);

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error while updating profile",
      success: false,
    });
  }
};
