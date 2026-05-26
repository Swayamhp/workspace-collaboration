import { Request, Response } from "express";
import { User } from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../services/createTokens";
import { sendTokens } from "../utils/sendTokens";
import { Tokens } from "../utils/sendTokens";
import saveRefreshToken from "../utils/saveRefreshToken"

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 1. Check all fields are provided
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
      return;
    }

    // 3. Create new user (password auto hashed via pre save hook)
    const user = await User.create({ name, email, password });

    // Create tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    const tokens:Tokens = {
      accessToken,
      refreshToken
    }
    //sending tokens 
    sendTokens(res,tokens)

    //SaveRefreshTokens
    saveRefreshToken(user.id,refreshToken);


    // 4. Return response without password
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};