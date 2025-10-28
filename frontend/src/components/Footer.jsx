import React from 'react'
import { assets } from '../assets/assets'

export const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex sm-grid grid-cols[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* Left side */}
            <div>
                <img  className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600leading-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, exercitationem commodi! Debitis ullam facilis aut id sint officiis modi fugit enim laborum! Ducimus, fugit fugiat amet dicta assumenda praesentium libero repellendus, incidunt nisi suscipit neque quia ad perferendis labore hic.</p>
            </div>

            {/* Center side */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/* Right side */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 9324851224</li>
                    <li>bhaveshdhaware1@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* Copyright Text */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ RadAssist - All rights reserved.</p>
        </div>
    </div>
  )
}
