import React from "react";
import { BlogContext } from "../context/BlogContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function Body() {
  const { insertPost, post, deletePost } = useContext(BlogContext);
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    image: null,
  });

  const handlePost = async (e) => {
    e.preventDefault(); // no recarga pagina
    const newFormData = new FormData(); //objeto nuevo
    newFormData.append("titulo", formData.titulo);
    newFormData.append("contenido", formData.contenido);
    newFormData.append("image", formData.image);

    await insertPost(newFormData);
    formData.titulo = "";
    formData.contenido = "";
    formData.image = null;
  };

  const handleDelete = (id) => {
    deletePost(id);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Red Blog</h1>
        <div className="mb-4">
          <form encType="multipart/form-data">
            <input
              type="text"
              placeholder="Titulo"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="¿Qué quieres postear?"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={formData.contenido}
              onChange={(e) =>
                setFormData({ ...formData, contenido: e.target.value })
              }
            />
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
            <button
              className="w-full bg-red-600 text-white py-2 rounded"
              onClick={handlePost}
            >
              ¡Postea!
            </button>
          </form>

          {post &&
            post.map((p) => (
              <div key={p.id} className="p-4 bg-gray-100 rounded">
                <p className="text-gray-800 text-2xl">{p.titulo}</p>
                <p className="text-gray-800">{p.contenido}</p>
                <div className="flex">
                  <button
                    className="bg-red-600 text-white py-2 px-2 rounded"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                  <Link to={`/posteo/${p.id}`}>
                    <button className="bg-blue-600 text-white py-2 px-2 rounded ml-5">
                      Ver posteo
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
