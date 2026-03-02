import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import App from "@/App";

// Lazy load components
const Home = lazy(() => import("@/pages/Home/Home").then(module => ({ default: module.Home })));
const Projects = lazy(() => import("@/pages/Projects/Projects").then(module => ({ default: module.Projects })));
const Stack = lazy(() => import("@/pages/Stacks/Stacks").then(module => ({ default: module.Stack })));
const Blogs = lazy(() => import("@/pages/Blog/Blog").then(module => ({ default: module.Blogs })));
const Contact = lazy(() => import("@/pages/Contact/Contact").then(module => ({ default: module.Contact })));
const Me = lazy(() => import("@/pages/Me/Me"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={null}>
            <Home />
          </Suspense>
        ) 
      },
      { 
        path: "projects", 
        element: (
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
        ) 
      },
      { 
        path: "stack", 
        element: (
          <Suspense fallback={null}>
            <Stack />
          </Suspense>
        ) 
      },
      { 
        path: "blogs", 
        element: (
          <Suspense fallback={null}>
            <Blogs />
          </Suspense>
        ) 
      },
      { 
        path: "contact", 
        element: (
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        ) 
      },
      { 
        path: "me", 
        element: (
          <Suspense fallback={null}>
            <Me />
          </Suspense>
        ) 
      },
    ],
  },
]);

export default router;

