import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayouts.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

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
          path: "/about",
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default ReactRouter;
