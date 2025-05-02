import React from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import store from "../store";
import { Provider } from "react-redux";

function App() {

  return (
    <Provider store={store}>
      <AppRoutes />
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
    </Provider>
  );
}

export default App;
