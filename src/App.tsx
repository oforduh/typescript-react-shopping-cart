import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Pages from "./pages";
import Navbar from "./components/navbar/Navbar";


const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/about" element={<Pages.About />} />
          <Route path="/store" element={<Pages.Store />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
