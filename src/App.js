import React from "react";
import { Container } from "@mui/material";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <HomePage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
