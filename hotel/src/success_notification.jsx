import React from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";



const Success = ({message}) => {
  
  return (
    <>
   <div className='bg-blue-100 w-[22rem] animate-notify fixed right-20 top-24 rounded'>
        <div className='ml-2 p-1 flex '>
            <div className='flex justify-center items-center text-green-500 text-xl dark:text-green-500'><IoIosCheckmarkCircle /></div>
            <div className=' ml-6'>
             <div className='font-bold text-emerald-800 dark:text-emerald-800'>Success</div>
            <div className='text black dark:text-black'>{message}</div>
           
              
            </div>
        </div>
    </div>
   
    </>
  )
}

export default Success