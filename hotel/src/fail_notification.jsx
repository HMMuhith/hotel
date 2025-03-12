import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";


const Fail = ({message}) => {
  return (
    <>
    <div className='bg-red-100 w-[22rem] rounded animate-notify absolute right-20 top-24 '>
        <div className='ml-2 p-1 flex '>
            <div className='flex justify-center items-center  text-red-500 text-xl dark:text-red-500'><IoIosCloseCircle /></div>
            <div className='border border-zinc-100 ml-6'>
             <div className='font-bold text-red-800 dark:text-red-800'>Error</div>
            <div className='text black dark:text-black'>{message}</div>
           
            </div>
        </div>
    </div>
    </>
  )
}

export default Fail