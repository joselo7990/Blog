import { createContext, useState, useEffect } from "react";

export const BlogContext = createContext(null);

export default function BlogContextProvider({ children }) {
  const [post, setPost] = useState([]);

  // get mostrar posteos

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    const res = await fetch("http://localhost:3000");
    const data = await res.json();
    setPost(data);
  };

  //Agregar un post
  const insertPost = async (formData) => {
    const res = await fetch("http://localhost:3000", {
      method: "POST",
      body: formData,
    });
    if (res.status === 200) {
      console.log("Correcto");
      getAllPost();
    }
  };
  // Eliminar un post
  const deletePost = async (id) => {
    const res = await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      console.log("Correcto");
      getAllPost();
    }
  };

  return (
    <BlogContext.Provider
      value={{
        insertPost,
        post,
        deletePost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
