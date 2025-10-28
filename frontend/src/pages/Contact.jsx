import React from 'react'
import { assets } from '../assets/assets'

export const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>  
      </div>
      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-conter items-start gap-6'>
          <p className='text-gray-600 font-semibold text-lg'>OUR OFFICE</p>
          <p className='text-gray-500'>54709 WILLMS station <br />Suite 350, Washingtion, USA</p>
          <p className='text-gray-500'>Contact: 9324851224 <br />Email:bhaveshdhaware1@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT RadAssist</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      
    </div>
  )
}
