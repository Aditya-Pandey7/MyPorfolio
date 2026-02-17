import { Outlet } from "react-router-dom";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/SideBar/SideBar";
import Footer from "./components/footer/Footer";
import CardNav from "./components/CardNav";

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
          href: "/about",
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
          href: "/blog",
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
          label: "Email",
          href: "mailto:adipandey830@gmail.com",
          ariaLabel: "Email us",
        },
        {
          label: "Twitter",
          href: "https://x.com/adi_iox",
          ariaLabel: "Twitter",
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/aditya-pandey-070447233",
          ariaLabel: "LinkedIn",
        },
        {
          label: "GitHub",
          href: "https://github.com/captain-adi",
          ariaLabel: "GitHub",
        },
      ],
    },
  ];
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
          <div className="px-6 container mx-auto flex-1">
            <SidebarTrigger className="absolute top-4 right-4 md:hidden " />
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
}

export default App;
