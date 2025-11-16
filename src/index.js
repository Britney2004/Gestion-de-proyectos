import React from 'react';
import ReactDOM from 'react-dom/client';
import './index'
import App from './App'
import { BrowserRouter } from "react-router-dom";


//Redenderizado de la App
//Envuelve la App en el BrowserRouter para habilitar la navegacion por Router Dom
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)