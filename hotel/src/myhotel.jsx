import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

function MyHotel() {
    const [Data, setdata] = useState([])

    useEffect(() => {
        const request = async () => {
            const response = await axios.get(`http://127.0.0.1:7000/booking`)
            const data = response.data
            console.log(data)
            setdata(data)
        }
        request()
    }, [])


    return (
        <div className="overflow-x-hidden border border-black w-svw h-auto">
            <span className="flex justify-between w-svw">
                <h1 className="text-3xl mt-2 ml-7 font-bold">My Hotels</h1>
                <Link
                    to="/addhotel"
                    className="flex bg-rose-600 rounded text-white text-xl font-bold mr-6 my-2 p-2 hover:bg-blue-500"
                >
                    Add Hotel
                </Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {Data.map((hotel) => (
                    <div
                        data-testid="hotel-card"
                        className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
                    >
                        <h2 className="text-2xl font-bold">{hotel.name}</h2>
                        <div className="whitespace-pre-line">{hotel.description}</div>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsMap className="mr-1" />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsBuilding className="mr-1" />
                                {hotel.type}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiHotel className="mr-1" />
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiStar className="mr-1" />
                                {hotel.starRating} Star Rating
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link
                                to={`/edithotel/${hotel._id}`}
                                className="flex bg-rose-600 text-white text-xl -mr-3 rounded font-bold p-2 hover:bg-blue-500"
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyHotel