
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/HomePage.jsx";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;