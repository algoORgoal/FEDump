import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Board from "./Board";
import Content from "./Content";
import Write from "./Write";

import Loading from "./Loading";

const Router = () => {
  const router = createBrowserRouter([
    {
      index: true,
      path: "/",
      element: <Board />,
    },
    {
      path: "/content/:id",
      element: <Content />,
    },
    {
      path: "/write",
      element: <Write />,
    },
    {
      path: "loading",
      element: <Loading />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
