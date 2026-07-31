import AuthUser from "../../models/auth/auth.model.js";
import { comparePassword } from "../../utils/hash.js";
import { createToken } from "../../utils/jwt.js";
import { ok, fail } from "../../middlewares/responseHandler.js";

export const login = async (req, res, next) => {
  try {
    const { EMAIL, PASSWORD } = req.body;

    const user = await AuthUser.findUserByEmail(EMAIL);
    if (!user) return fail(res, req.t("auth.userNotFound"), 404);

    const isMatch = await comparePassword(PASSWORD, user.PASSWORD);
    if (!isMatch) return fail(res, req.t("auth.incorrectPassword"), 401);

    const { accessToken, expires_at } = createToken(user);
    const userInfo = { ...user, accessToken, expires_at };
    delete userInfo.PASSWORD;


    // Rút gọn việc trả về kết quả
    return ok(res, userInfo, req.t("auth.loginSuccess"));

  } catch (err) {
    console.error("Login Error:", err);
    return fail(res, req.t("server.internalError"), 500);
  }
};
export const logout = async (req, res, next) => {
  try {
    return ok(res, {}, req.t("auth.logoutSuccessful"));
  } catch (err) {
    console.error("Logout Error:", err);
    return fail(res, req.t("server.internalError"), 500);
  }
};