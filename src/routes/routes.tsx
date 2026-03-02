import { createBrowserRouter } from "react-router";
import { Home } from "@/pages/Home/Home";
import App from "@/App";
import { Projects } from "@/pages/Projects/Projects";
import { Stack } from "@/pages/Stacks/Stacks";
import { Blogs } from "@/pages/Blog/Blog";
import { Contact } from "@/pages/Contact/Contact";
import Me from "@/pages/Me/Me";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "stack", element: <Stack /> },
      { path: "blogs", element: <Blogs /> },
      { path: "contact", element: <Contact /> },
      { path: "me", element: <Me /> },
    ],
  },
]);

export default router;
