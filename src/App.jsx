import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayouts.jsx";
import Home from "../pages/Home.jsx";
import Rankings from "../pages/Rankings.jsx";
import Fixtures from "../pages/Fixtures.jsx";
import Transferts from "../pages/Transferts.jsx";
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
          path: "/fixtures",
          element: <Fixtures />,
        },
        {
          path: "/rankings",
          element: <Rankings />,
        },
        {
          path: "/transferts",
          element: <Transferts />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default ReactRouter;
