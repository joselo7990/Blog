function NavBar(params) {
  return (
    <div className="w-full h-screen bg-red-600 flex flex-col justify-between">
      <h1 className="mt-5 flex justify-center items-center text-2xl font-bold text-white">
        Red Blog
      </h1>

      <p className="text-white flex items-center flex-grow">
        Este es tu blog para dejar comentarios, pensamientos, compartir tus
        ideas sobre lo que te parezca.
      </p>
    </div>
  );
}

export default NavBar;
