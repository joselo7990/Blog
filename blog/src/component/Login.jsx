function Login(params) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {" "}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {" "}
        <h1 className="text-2xl font-bold mb-4 text-red-600">Red Blog</h1>{" "}
        <div className="mb-4">
          {" "}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />{" "}
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />{" "}
          <button className="w-full bg-red-600 text-white py-2 rounded">
            {" "}
            Iniciar Sesión{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Login;
