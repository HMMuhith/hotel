import React from 'react'
import Navbar from './navbar'
import Header from './header'
import Footer from './footer'

function Home() {
  return (
    <>
    <div className='relative w-svw h-svh text-black '>
    {/* <div className='absolute left-svw right-10 top-6'><Navbar/></div> */}
    <div><Header/></div>
    <div><Footer/></div>
    </div>
    </>
  )
}

export default Home