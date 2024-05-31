import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff";
import Inbound from "./pages/Inbound";
import Dashboard from "./pages/Dashboard";
import StuffTrash from "./pages/StuffTrash";
import User from "./pages/User";
import InboundData from "./pages/InboundData";
import InboundCreate from "./pages/InboundCreate";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/stuffs', element: <Stuff /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/inbound', element: <Inbound /> },
    { path: '/stuffs/trash', element: <StuffTrash /> },
    { path: '/users', element: <User /> },
    { path: '/InboundData', element: <InboundData /> },
    { path: '/InboundCreate', element: <InboundCreate /> },
])