import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './routes/Home';
import Basic from './routes/Basic';
import Movie from './routes/Movie';
import './css/App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
  {
    path: "/basic",
    element: <Basic />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
