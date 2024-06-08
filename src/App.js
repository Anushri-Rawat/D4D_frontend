import React, { useState, useEffect } from "react";
import { Header, Chats, Footer } from "./component";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  HomePage,
  SignupPage,
  SigninPage,
  EditDetailsPage,
  ProfilePage,
  ProjectDetailsPage,
  EditProjectDetailsPage,
  SearchProjectPage,
  SearchProfilePage,
  CollectionsPage,
  CollectionDetailsPage,
  ChatPage,
} from "./pages";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import {
  getMostLikedProjects,
  getMostViewedProjects,
} from "./actions/projectActions";

function App() {
  const location = useLocation();

  const [socket, setSocket] = useState();

  const socketHandler = (socket) => {
    setSocket(socket);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostLikedProjects());
    dispatch(getMostViewedProjects());
  }, []);

  return (
    <div className="App">
      {location.pathname !== "/signup" && location.pathname !== "/signin" && (
        <Header />
      )}
      <main style={{ paddingBottom: `${location.pathname !== "/" && "50px"}` }}>
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
          <Route
            path="/chat"
            element={
              <Grid
                container
                sx={{
                  backgroundColor: "#4cacbc22",
                  height: "calc(100vh - 58px)",
                  overflowY: "hidden",
                }}
              >
                <ChatPage isConvOpen="false" socketHandler={socketHandler} />
              </Grid>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <Grid
                container
                sx={{
                  backgroundColor: "#4cacbc22",
                  height: "calc(100vh - 58px)",
                  overflowY: "hidden",
                }}
              >
                <ChatPage isConvOpen="true" socketHandler={socketHandler} />
                <Chats socket={socket} />
              </Grid>
            }
          />
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
      {location.pathname == "/" && <Footer />}
    </div>
  );
}

export default App;
