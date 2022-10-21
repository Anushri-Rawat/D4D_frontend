import React from "react";
import { Container } from "@mui/material";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ProfilePage from "./pages/ProfilePage";
function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header>
                  <Header />
                </header>
                <Container>
                  <HomePage />{" "}
                </Container>
              </>
            }
          />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
