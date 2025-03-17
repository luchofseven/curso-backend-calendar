import { Router } from "express";
import { check } from "express-validator";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";
import { fieldValidator } from "../middlewares/field-validator.js";
import { JWTValidator } from "../middlewares/jwt-validator.js";
import { isDate } from "../helpers/isDate.js";

const router = Router();

// Obtener eventos: si deseamos que sea público lo subimos antes de ejecutar el .use(JWTValidator)
// router.get("/", getEvents);

// Todas tienen que pasar por la validación del JWT.
router.use(JWTValidator);

// Obtener eventos
router.get("/", getEvents);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").custom(isDate),
    fieldValidator,
  ],
  createEvent
);

// Actualizar evento
router.put("/:id", updateEvent);

// Eliminar evento
router.delete("/:id", deleteEvent);

export default router;
