import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './routes/Home';
import Basic from './routes/Basic';
import Movie from './routes/Movie';
import MovieDetail from './routes/MovieDetail';
import './css/App.css';

const router = createBrowserRouter([
  {
    path: "/project-react",
    element: <Home />,
  },
  {
    path: "/project-react/movie",
    element: <Movie />,
  },
  {
    path: "/project-react/movie/:id",
    element: <MovieDetail />,
  },
  {
    path: "/project-react/basic",
    element: <Basic />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
