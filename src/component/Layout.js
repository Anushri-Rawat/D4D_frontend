import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/signin" || location.pathname === "/signup";
  const hideFooter =
    location.pathname === "/signin" || location.pathname === "/signup";
  return (
    <>
      {hideHeader ? null : <Header />}
      <main style={{ paddingBottom: `${location.pathname !== "/" && "50px"}` }}>
        <Outlet />
      </main>
      {hideFooter ? null : <Footer />}
    </>
  );
};
export default Layout;
