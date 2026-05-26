import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      req.cookies.accessToken

    if (!accessToken) {
      return res.status(401).json({
        message: "No access token",
      })
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    )

    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      message: "Invalid access token",
    })
  }
}