import React from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HomePage from "./pages/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import EditDetailsPage from "./pages/EditDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectDetailsPage from "./pages/EditProjectDetailsPage";
import SearchProjectPage from "./pages/SearchProjectPage";
import SearchProfilePage from "./pages/SearchProfilePage";
import { ToastContainer } from "react-toastify";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionDetailsPage from "./pages/CollectionDetailsPage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/signup" && location.pathname !== "/signin" && (
        <Header />
      )}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/edit/basic-details" element={<EditDetailsPage />} />
          <Route
            path="/edit/basic-details/:id"
            element={<EditDetailsPage mode="edit" />}
          />
          <Route
            path="/edit/projects-gallery"
            element={<EditProjectDetailsPage />}
          />
          <Route
            path="/edit/projects-gallery/:id"
            element={<EditProjectDetailsPage mode="edit" />}
          />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/search/projects" element={<SearchProjectPage />} />
          <Route path="/search/profiles" element={<SearchProfilePage />} />
          <Route
            path="/project/:project_name/:id"
            element={<ProjectDetailsPage />}
          />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:id" element={<CollectionDetailsPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
      {location.pathname !== "/signup" && location.pathname !== "/signin" && (
        <Footer />
      )}
    </div>
  );
}

export default App;
