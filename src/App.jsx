import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayouts.jsx";
import Home from "../pages/Home.jsx";
import Games from "../pages/Games.jsx";
import Members from "../pages/Members.jsx";
import News from "../pages/News.jsx";
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
          path: "/games",
          element: <Games />,
        },
        {
          path: "/members",
          element: <Members />,
        },
        {
          path: "/news",
          element: <News />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default ReactRouter;
