import React, { useState } from "react";
import Modal from "react-modal";

const EditPostModal = ({ isOpen, onClose, post, id, getPostById }) => {
  const [editComentario, setEditComentario] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault(); // no se reinicia la pag
    const res = await fetch(`http://localhost:3000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
      },
      body: JSON.stringify({ contenido: editComentario }), // Convierte el objeto a JSON
    });

    if (res.status === 200) {
      onClose();
      getPostById();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Posteo"
      className="bg-white p-5 rounded shadow-lg"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-85 flex justify-center items-center"
    >
      <h2 className="text-lg font-bold mb-4">Editar Posteo: {post.titulo}</h2>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Edita el posteo!"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={editComentario}
          onChange={(e) => setEditComentario(e.target.value)}
        />
        <button className="w-full bg-red-600 text-white py-2 rounded">
          ¡Comenta!
        </button>
      </form>
      <button
        onClick={onClose}
        className="bg-red-600 text-white py-2 px-4 rounded mt-4"
      >
        Cerrar
      </button>
    </Modal>
  );
};

export default EditPostModal;
