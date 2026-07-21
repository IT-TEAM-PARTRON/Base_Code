import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      const err = new Error("Không có token, vui lòng đăng nhập");
      err.status = 401;
      err.errorCode = "NO_TOKEN";
      return next(err);
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    error.status = 403;
    error.errorCode = "INVALID_TOKEN";
    next(error);
  }
};