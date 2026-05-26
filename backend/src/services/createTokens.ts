import jwt from "jsonwebtoken"
import { Tokens } from "../utils/sendTokens"

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  )
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  )
}