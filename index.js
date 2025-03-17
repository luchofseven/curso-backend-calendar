import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import eventsRoutes from "./routes/events.js";
import { dbConnection } from "./database/config.js";

// Configuración para poder leer el .env
dotenv.config();

// Crear servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);

// Escuchar peticiones
app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Servidor corriente en el puerto ${process.env.PORT ?? 3000}`);
});
