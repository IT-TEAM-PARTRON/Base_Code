import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createToken = (user) => {
  const expiresIn = "1d"; // sau 2h thi token hết hạn

  // Tạo token trước
  const accessToken = jwt.sign(
    { ID: user.ID, USERID: user.USERID },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn },
  );

  // Decode để lấy "exp"
  const { exp } = jwt.decode(accessToken);

  return {
    accessToken,
    expires_at: new Date(exp * 1000).toISOString(),
  };
};
