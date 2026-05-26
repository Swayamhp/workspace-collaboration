import { User } from "../models/user.model"

const saveRefreshToken = async (
  userId: string,
  refreshToken: string
): Promise<void> => {
  try {
    await User.findByIdAndUpdate(
      userId,
      { refreshToken }
    )
  } catch (error) {
    console.log(error)

    throw new Error(
      "Failed to save refresh token"
    )
  }
}

export default saveRefreshToken