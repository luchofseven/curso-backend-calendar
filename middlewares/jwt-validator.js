import { request, response } from "express";
import jwt from "jsonwebtoken";

export const JWTValidator = (req = request, res = response, next) => {
  // x-token headers

  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "El token no existe en la petición",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: "Token inválido",
    });
  }

  next();
};
