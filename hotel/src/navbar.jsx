import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <div className='flex border border-blue-900'>
      <NavLink className={`px-3 text-xs font-bold font-mont`} to={`/`}>Home</NavLink>
      <NavLink className={`px-3 text-xs font-bold font-mont`} to={`/register`}>Register</NavLink>
      <NavLink className={`px-3 text-xs font-bold font-mont`} to={`/login`}>Log in</NavLink>
    </div>
    </>
  )
}

export default Navbar