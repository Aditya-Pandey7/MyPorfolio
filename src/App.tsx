import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/SideBar/SideBar";
import Footer from "./components/footer/Footer";
import CardNav from "./components/CardNav";
import Connect from "./components/connect/Connect";
import { useEffect } from "react";

function App() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "Home",
          href: "/",
          ariaLabel: "Home Page",
        },
        {
          label: "Me",
          href: "/me",
          ariaLabel: "About Me Page",
        },
        {
          label: "My Skills",
          href: "/stack",
          ariaLabel: "About My Skills Page",
        },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Featured",
          href: "/projects",
          ariaLabel: "Featured Projects",
        },
        {
          label: "Case Studies",
          href: "#projects/case-studies",
          ariaLabel: "Project Case Studies",
        },
      ],
    },
    {
      label: "Blog",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "My Blogs",
          href: "/blogs",
          ariaLabel: "Featured Blogs",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        {
          label: "Contact Me",
          href: "/contact",
          ariaLabel: "Contact Me Page",
        },
      ],
    },
  ];

  const {pathname} = useLocation();

   useEffect(()=>{
    window.scrollTo(0,0)
   },[pathname])

  return (
    <>
      <SidebarProvider>
        <div className="md:hidden block">
          <AppSidebar />
        </div>

        <main className="flex-1 flex flex-col">
          <div className="md:block hidden">
            <CardNav
              logo="/logo.png"
              logoAlt="Company Logo"
              items={items}
              baseColor="#fff"
              menuColor="#000"
              buttonBgColor="#111"
              buttonTextColor="#fff"
              ease="power3.out"
            />
          </div>
          <div className="flex-1">
            <SidebarTrigger className="absolute top-4 right-4 md:hidden " />
            <Outlet />
          </div>
          <Connect />
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}

export default App;
