import { Response } from "express"

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export const sendTokens = (
  res: Response,
  tokens: Tokens
) => {
  res
    .cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}