import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://she-can-foundation-1-qolc.onrender.com";
import "./index.css";

import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>

        <StrictMode>

            <ToastContainer
                position="top-right"
                autoClose={2200}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
                toastClassName="customToast"
                bodyClassName="customToastBody"
                progressClassName="customToastProgress"
            />

            <App />

        </StrictMode>

    </BrowserRouter>

);