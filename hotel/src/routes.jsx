import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Register from "./register";
import LogIn from "./login";
import Header from "./header";
import Footer from "./footer";
import Hotelform from "./hotelform";
import MyHotel from "./myhotel";
import EditHotel from "./edithotel";
import Search from "./search";
import Details from "./details";
import Booking from "./booking";
import { MyBooking } from "./mybooking";

function Routes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element:<><Header/><Home /><Footer/></> 
        },
        {
           path:'/register' ,
           element:<><Header/><Register/><Footer/></>
        },
        {
            path:'/login',
            element:<><Header/><LogIn/><Footer/></>
        },
        {
            path:'/addhotel',
            element:<><Header/><Hotelform/><Footer/></>
        },
        {
            path:'/myhotel',
            element:<><Header/><MyHotel/><Footer/></>
        },
        {
            path:'/edithotel/:hotelid',
            element:<><Header/><EditHotel/><Footer/></>
        },
        {
            path:'/search',
            element:<><Header/><Search/><Footer/></>
        },
        {
            path:'/details/:hotelid',
            element:<><Header/><Details/><Footer/></>
        },
        {
            path:'/booking/:hotelid',
            element:<><Header/><Booking/><Footer/></>
        },
        {
            path:'/mybooking',
            element:<><Header/><MyBooking/><Footer/></>
        },
        {
            path:'/search?page/:pageNumber',
            element:<><Header/><Search/><Footer/></>
        }
       
    ])
    return ( 
        <>
        <RouterProvider router={router} />
        </>
    )
}

export default Routes