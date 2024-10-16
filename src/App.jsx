import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayouts.jsx";
import Home from "../pages/Home.jsx";
import News from "../pages/News.jsx";
import Favorites from "../pages/Favorites.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Competitions from "../pages/Competitions.jsx";
import Register from "../pages/Register.jsx";

function ReactRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <SharedLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/competitions",
          element: <Competitions />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default ReactRouter;
