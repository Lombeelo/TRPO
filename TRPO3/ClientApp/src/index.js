import React from "react";
import App from './App';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Router, Route, hashHistory} from  "react-router-dom";

createRoot(document.getElementById("root")).render(
        <App/>
    );

