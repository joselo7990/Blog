import { connection } from "../config/db.config.js";

export const getComentarios = async (req, res) => {
  const { id } = req.params;
  try {
    const [comentarios] = await connection.query(
      " SELECT * FROM comentarios WHERE post_id = ?",
      [id]
    );
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "eror al hacer get" });
  }
};

// postear comentarios

export const createComentarios = async (req, res) => {
  const { post_id, comentario } = req.body;
  try {
    if (post_id && comentario) {
      console.log("Datos recibidos:", { post_id, comentario });

      const [result] = await connection.query(
        "INSERT INTO comentarios(post_id, comentario) VALUES (?,?)",
        [post_id, comentario]
      );
      res.json(result);
    } else {
      res.status(400).json({ error: "postId  y comentarios son requeridos" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// eliminar comentarios

export const delateById = async (req, res) => {
  const { id } = req.params;
  try {
    const [comentario] = await connection.query(
      `DELETE FROM comentarios WHERE id=?`,
      [id]
    );
    res.send("eliminado");
    console.log("eliminado ok");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
