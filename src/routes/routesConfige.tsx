
import { FaGithub } from "react-icons/fa6";
import { NotFound } from "../pages/page404";
import { AboutPage } from "../pages/users/about";
import { ContactSection } from "../pages/users/contact";
import { Experience } from "../pages/users/experience";
import Home from "../pages/users/home/Home";
import { Login } from "../pages/users/login";
import { Skills } from "../pages/users/skills";
import { Projects } from "../pages/users/projects";

export const publicRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/home/about", element: <AboutPage /> },
    { path: "/home/skills", element: <Skills /> },
    { path: "/home/experience", element: <Experience /> },
    { path: "/home/projects", element: <Projects /> },
    { path: "/home/contact", element: <ContactSection /> },
    { path: "https://github.com/London7121", element: "GitHub", icon: <FaGithub />, link: "https://github.com/London7121" },
    { path: "/home/login", element: <Login /> },
];

export const fallbackRoute = { path: "*", element: <NotFound /> };