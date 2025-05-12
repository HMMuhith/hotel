import React from 'react'

function Footer() {
    return (
        <div className='flex justify-center items-center mt-5 py-10 flex-col bg-slate-950'>
            <div className='text-white font-bold mx-auto flex  pb-4  w-[30rem] justify-center gap-10 items-center'>
                <p className=''>
                    <span className='capitalize cursor-pointer pr-2'>
                        privacy policy
                    </span>
                    <span className='capitalize cursor-pointer p-2'>
Terms & service
                    </span>
                </p>
            </div>
    <p className='lg:text-white text-xs text-white sm:text-xs lg:text-lg '>&#169;<small>All Rights Reserved by Hotel</small></p>

        </div>
    )
}

export default Footer