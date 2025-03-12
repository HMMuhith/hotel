import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LogOut } from './authSlice'
import axios from 'axios'

function Header() {
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
   async function logoutHandler(){
const data=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,{
    withCredentials:true
   }
)
console.log(data)
        dispatch(LogOut())
   }
    return (
        <div className='bg-header text-white flex flex-col w-svw'>
            <div className='flex justify-between mx-auto w-svw '>
                <span className='py-4 pl-14 tracking-tight text-3xl font-bold tracking-light'>
                    Hotel
                </span>
                <span className='flex justify-center text-sm items-center  font-bold mr-14'>
                    <button className='bg-white text-black  flex justify-center items-center w-20 h-8 rounded'>{user?<Link to={`/`} onClick={logoutHandler} className=''>Log out</Link>:<Link to={`/login`} className=''>Log in</Link>}</button> <br /><br />
                </span>
            </div>
            <div className='flex flex-col pt-2 pb-13'>
               <div>
                <h1 className='text-3xl pl-14 text-white font-bold pb-2'>Your Dream Stay is Just a Click Away!</h1>
                <p className='text-white tracking-tight font-semibold pl-14'>Exclusive Packages for Families & Couples!</p>
               </div> 
            </div>
        </div>
    )
}

export default Header