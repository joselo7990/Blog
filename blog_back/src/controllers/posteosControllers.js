import { connection } from "../config/db.config.js";

export const getPosteos = async (req, res) => {
  try {
    const [posteos] = await connection.query(" SELECT * FROM posteos");
    res.json(posteos);
  } catch (error) {
    res.status(500).json({ error: "eror al hacer get" });
  }
};
//get by id
export const getPosteoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [posteo] = await connection.query(
      " SELECT * FROM posteos WHERE id = ?",
      [id]
    );
    res.json(posteo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//create
export const createPost = async (req, res) => {
  const { titulo, contenido } = req.body;

  try {
    if (titulo && contenido) {
      const [posteo] = await connection.query(
        "INSERT INTO posteos(titulo, contenido , image) VALUES (?,?,?)",
        [titulo, contenido, req.file?.filename] //req.file opcional
      );
      res.json(posteo);
    } else {
      res.status(400).json({ error: "titulo  y contenido son requeridos" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

//updateBy Id
export const updateById = async (req, res) => {
  const { id } = req.params;
  const { contenido } = req.body;
  try {
    const [posteos] = await connection.query(
      `
    UPDATE posteos SET contenido=? WHERE id=?;`,
      [contenido, id]
    );

    res.json(posteos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//delate by id

export const delateById = async (req, res) => {
  const { id } = req.params;
  try {
    const [posteos] = await connection.query(`DELETE FROM posteos WHERE id=?`, [
      id,
    ]);
    res.send("eliminado");
    console.log("eliminado ok");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
