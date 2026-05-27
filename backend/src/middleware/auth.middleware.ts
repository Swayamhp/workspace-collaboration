import { Request, Response, NextFunction }
from "express";

import jwt from "jsonwebtoken";

import { User }
from "../models/user.model";

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const token =
      req.cookies?.accessToken;

    if (!token) {

      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as {
      userId: string;
    };

    const user = await User.findById(
      decoded.userId
    ).select("-password -refreshToken");

    if (!user) {

      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid access token",
    });
  }
};