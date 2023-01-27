import {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1]; //grabs second value of the array

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);
    // req.user = payload;
    req.user = {userId: payload.userId};
    next();
  } catch (error) {
    throw new UnauthenticatedError("Auth invalid");
  }
};

export default auth;
