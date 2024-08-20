import { useEffect, useState, useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import EditPostModal from "./EditPostModal";

//mostrar comentarios//

function Posteos(params) {
  const { posteoId } = useParams();
  const { deletePost } = useContext(BlogContext);
  const [post, setPost] = useState(null); //null falsy
  const [comentarios, setComentarios] = useState([]);
  const [postComentario, setPostComentario] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById();
  }, []);

  const getPostById = () => {
    fetch(`http://localhost:3000/${posteoId}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  };
  const traerComentarios = () => {
    fetch(`http://localhost:3000/comentarios/${posteoId}`)
      .then((response) => response.json())
      .then((data) => setComentarios(data));
  };
  useEffect(() => {
    traerComentarios();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault(); // no se reinicia la pag
    const res = await fetch("http://localhost:3000/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
      },
      body: JSON.stringify({ post_id: posteoId, comentario: postComentario }), // Convierte el objeto a JSON
    });
    if (res.status == 200) {
      traerComentarios();
    }
    setPostComentario("");
  };
  const deleteComentario = async (id) => {
    const res = await fetch(`http://localhost:3000/comentarios/${id}`, {
      method: "DELETE",
    });
    console.log(res);
    if (res.status === 200) {
      traerComentarios();
    }
  };

  const handleDelete = () => {
    deletePost(posteoId);
    navigate("/");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(post);
  return (
    <>
      {post ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-black-600 text-center">
              POSTEO
            </h1>
            <h1 className="text-2xl font-bold mb-4 text-red-600">
              {post[0].titulo}
            </h1>
            <p className="text-gray-800"> {post[0].contenido}</p>
            {post[0].image && (
              <img
                src={`http://localhost:3000/uploads/${post[0].image}`}
                alt="imagen"
                className="w-full h-64 object-cover mt-4"
              />
            )}
            <h3 className="text-xxl font-bold mb-4">Comentarios:</h3>
            {comentarios.map((c, index) => (
              <p key={index} className="mb-4">
                {c.comentario}
                <button
                  className="bg-red-600 text-white py-2 px-1 rounded"
                  onClick={() => {
                    deleteComentario(c.id);
                  }}
                >
                  Eliminar
                </button>
              </p>
            ))}
            <form onSubmit={handlesubmit}>
              <input
                type="text"
                placeholder="¿Qué quieres comentar sobre este post?"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={postComentario}
                onChange={(e) => setPostComentario(e.target.value)}
              />
              <button className="w-full bg-red-600 text-white py-2 rounded">
                ¡Comenta!
              </button>
            </form>

            <Link to="/">
              <button className="bg-red-600 text-white py-2 px-2 rounded mt-3">
                Volver al Inicio
              </button>
            </Link>

            <button
              className="bg-blue-600 text-white py-2 px-2 rounded mt-3"
              onClick={openModal}
            >
              Editar Posteo
            </button>
            <EditPostModal
              isOpen={isModalOpen}
              onClose={closeModal}
              post={post[0]}
              id={posteoId}
              getPostById={getPostById}
            />

            <button
              className="bg-red-600 text-white py-2 px-2 rounded mt-3"
              onClick={handleDelete}
            >
              Eliminar Posteo
            </button>
          </div>
        </div>
      ) : (
        <div> cargando</div>
      )}
    </>
  );
}

export default Posteos;
