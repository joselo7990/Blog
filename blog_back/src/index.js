import express from "express";
import { posteosRouter } from "./routes/posteosRoutes.js";
import { comentariosRouter } from "./routes/comentariosRoutes.js";
import cors from "cors";
import path from "path";
import * as url from "url";

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware images
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/", posteosRouter);
app.use("/comentarios", comentariosRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
