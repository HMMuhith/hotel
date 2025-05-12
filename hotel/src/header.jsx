import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { LogOut } from './authSlice'
import axios from 'axios'
import SearchBar from './searchbar'

function Header() {
 
    const dispatch=useDispatch()
    const {user}=useSelector(store=>store.auth)
    
   async function logoutHandler(){
const data=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,{
    withCredentials:true
   }
)
console.log(data)
        dispatch(LogOut())
   }
    return ( 
        <>
        <div className='bg-slate-900 text-white flex p-0 m-0 flex-col w-svw'>
            <div className='flex justify-between h-20'>
                <div className='flex'>
                <NavLink to={'/'} className='cursor-pointer pl-14 mt-6 text-4xl tracking-wide font-bold '>
                 Hotel</NavLink>
                 </div>
                 <div className=' flex justify-end gap-4 items-center w-[25rem] mr-6'>
                               <span> 
                                <NavLink to={'/myhotel'} className=' bg-white mt-4 font-IBM text-black flex font-bold text-sm rounded justify-center items-center w-24 h-8  '>Myhotel</NavLink>
                                 </span>
                                 <span>
                                <NavLink to={'/mybooking'} className='bg-white mt-4 font-IBM text-black flex font-bold text-sm rounded justify-center items-center w-24 h-8 '>Mybooking</NavLink>
                                </span>
                                <span className='flex justify-center text-sm items-center mr-2 font-bold '>
                                    <button className='bg-white text-black mt-4 font-IBM flex justify-center items-center w-20 h-8 rounded'>{user?<Link to={`/`} onClick={logoutHandler} >Log out</Link>:<Link to={`/login`} >Log in</Link>}</button> <br /><br />
                                </span>
                </div>
            </div>
            <div className='flex flex-col pt-5 pb-7 '>
               <div className=''>
                <h1 className='text-3xl flex pl-14 text-white font-bold pb-2'>Your Dream Stay is Just a Click Away<span className='mt-1.5 pl-1'>!</span></h1>
                <p className='text-white tracking-tight font-semibold pl-14'>Exclusive Packages for Families & Couples!</p>
               </div> 
            </div>
        </div>
        <SearchBar/>
        </>
    )
}

export default Header