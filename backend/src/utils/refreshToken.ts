import type {Request,Response} from 'express'
import {User} from '../models/user.model'
import jwt from "jsonwebtoken";
import { generateAccessToken } from '../services/createTokens';
export const refreshAccessToken =
async (
  req: Request,
  res: Response
) => {

  try {

    const refreshToken =
      req.cookies?.refreshToken;

    if (!refreshToken) {

      return res.status(401).json({
        message: "No refresh token",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env
        .REFRESH_TOKEN_SECRET!
    ) as {
      userId: string;
    };

    const user = await User.findById(
      decoded.userId
    );

    if (
      !user ||
      user.refreshToken !== refreshToken
    ) {

      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken =
      generateAccessToken(user.id);

    res.cookie(
      "accessToken",
      newAccessToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      }
    );

    return res.status(200).json({
      success: true,
    });

  } catch {

    return res.status(401).json({
      message: "Refresh failed",
    });
  }
};