import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SharedLayout from "../layouts/SharedLayouts.jsx";
import Home from "../pages/Home.jsx";
import News from "../pages/News.jsx";
import Favorites from "../pages/Favorites.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Competitions from "../pages/Competitions.jsx";
import Register from "../pages/Register.jsx";
import TeamInformations from "../pages/TeamInformations.jsx";
import PlayerInformations from "../pages/PlayerInformations.jsx";
import CoachInformations from "../pages/CoachInformations.jsx";
import FixtureInformations from "../pages/FixtureInformations.jsx";
import { loader as TeamLoader } from "../pages/TeamInformations.jsx";
import { loader as PlayerLoader } from "../pages/PlayerInformations.jsx";
import { loader as CoachLoader } from "../pages/CoachInformations.jsx";
import { loader as FixtureLoader } from "../pages/FixtureInformations.jsx";

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
          path: "team-informations/:id",
          element: <TeamInformations />,
          loader: TeamLoader,
        },
        {
          path: "player-informations/:id",
          element: <PlayerInformations />,
          loader: PlayerLoader,
        },
        {
          path: "coach-informations/:id",
          element: <CoachInformations />,
          loader: CoachLoader,
        },
        {
          path: "fixture-informations/:id",
          element: <FixtureInformations />,
          loader: FixtureLoader,
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
