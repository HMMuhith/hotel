import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import LogIn from "./login";
import Header from "./header";
import Footer from "./footer";

function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
           path:'/register' ,
           element:<><Header/><Register/><Footer/></>
        },
        {
            path:'/login',
            element:<><Header/><LogIn/><Footer/></>
        }
    ])
    return (
        <>
        <RouterProvider router={router} />
        </>
    )
}

export default Routes