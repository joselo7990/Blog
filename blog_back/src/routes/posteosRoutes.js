import { Router } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });
import {
  getPosteos,
  createPost,
  getPosteoById,
  updateById,
  delateById,
} from "../controllers/posteosControllers.js";

const posteosRouter = Router();

posteosRouter.get("/", getPosteos);
posteosRouter.get("/:id", getPosteoById);
posteosRouter.put("/:id", updateById);
posteosRouter.post("/", upload.single("image"), createPost);
posteosRouter.delete("/:id", delateById);

export { posteosRouter };
