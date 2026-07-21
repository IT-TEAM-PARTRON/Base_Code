import { fail } from "../middlewares/responseHandler.js";

const errorMiddlewares = (err, req, res, next) => {
  console.error("ERROR:", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errorCode = err.errorCode || "SERVER_ERROR";

  return fail(res, message, status, errorCode);
};

export default errorMiddlewares;