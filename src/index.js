import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import ContextProvider from "./context/ContextProvider";

import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Router>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
    <ToastContainer />
  </ChakraProvider>
);
