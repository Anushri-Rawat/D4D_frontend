import React, { lazy, useState, Suspense } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ScrollToTop from "../component/ScrollToTop";
import Spinner from "../component/Spinner";
import Layout from "../component/Layout";

const HomePage = lazy(() => import("../pages/HomePage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const SigninPage = lazy(() => import("../pages/SigninPage"));
const EditDetailsPage = lazy(() => import("../pages/EditDetailsPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ProjectDetailsPage = lazy(() => import("../pages/ProjectDetailsPage"));
const EditProjectDetailsPage = lazy(() =>
  import("../pages/EditProjectDetailsPage")
);
const SearchProjectPage = lazy(() => import("../pages/SearchProjectPage"));
const SearchProfilePage = lazy(() => import("../pages/SearchProfilePage"));
const CollectionsPage = lazy(() => import("../pages/CollectionsPage"));
const CollectionDetailsPage = lazy(() =>
  import("../pages/CollectionDetailsPage")
);
const ChatPage = lazy(() => import("../pages/ChatPage"));
const Chats = lazy(() => import("../component/Chats"));

const AppRoutes = () => {
  const [socket, setSocket] = useState();

  const socketHandler = (socket) => {
    setSocket(socket);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Spinner fullPage={true} />}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
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
            <Route
              path="/collections/:id"
              element={<CollectionDetailsPage />}
            />
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
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default AppRoutes;
