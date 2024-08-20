import { Router } from "express";
import {
  getComentarios,
  createComentarios,
  delateById,
} from "../controllers/comentariosControllers.js";

const comentariosRouter = Router();

comentariosRouter.get("/:id", getComentarios);
comentariosRouter.post("/", createComentarios);
comentariosRouter.delete("/:id", delateById);

export { comentariosRouter };
