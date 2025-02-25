import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note-detail/:id" element={<NoteDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
