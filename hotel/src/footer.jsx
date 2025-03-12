import React from 'react'

function Footer() {
    return (
        <div className='flex justify-between items-center mt-5 py-10 bg-rose-600'>
            <div className='text-white font-bold mx-auto'>
                <p className='border-3 border-amber-300'>
                    <span className='capitalize cursor-pointer'>
                        privacy policy
                    </span>
                    <span className='capitalize cursor-pointer p-2'>
Terms & service
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Footer