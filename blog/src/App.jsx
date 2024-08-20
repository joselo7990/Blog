import Body from "./component/Body";
import NavBar from "./component/NavBar";
import BlogContextProvider from "./context/BlogContext";
import Login from "./component/Login";
import Registrer from "./component/Registrer";
import Posteos from "./component/Posteos";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <BlogContextProvider>
        <div className="flex min-h-screen">
          <div className="w-1/4">
            <NavBar />
          </div>
          <div className="w-3/4">
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/posteo/:posteoId" element={<Posteos />} />
            </Routes>
          </div>
        </div>
      </BlogContextProvider>
    </BrowserRouter>
  );
}

export default App;
