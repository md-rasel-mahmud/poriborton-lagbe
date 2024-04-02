import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Components from "../pages/Components";
import RenderedFormDialog from "../components/utils/form/RenderedFormDialog";
import Test from "../components/utils/Test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "components",
    element: <Components />,
    children: [
      {
        path: "form",
        element: <RenderedFormDialog />,
      },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
]);
