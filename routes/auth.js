import { Router } from "express";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/field-validator.js";
import { createUser, loginUser, renewToken } from "../controllers/auth.js";
import { JWTValidator } from "../middlewares/jwt-validator.js";

const router = Router();

router.get("/renew", JWTValidator, renewToken);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUser
);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  createUser
);

export default router;
