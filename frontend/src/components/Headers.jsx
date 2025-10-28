import React from 'react'
import { assets } from '../assets/assets'

export const Headers = () => {
  return (
    <div className='flex flex-col md:flex-row mt-0 flex-wrap bg-primary rounded-lg px-4 md:px-10 lg:px-20'>
        {/* {----Left-side----} */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px ]'>
            <p className='text-3xl md:text-4xl lg:text-4xl text-white font-semibold leading-tight'>
              Book Appointment <br /> With Trusted Doctors  
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-20' src={assets.group_profiles} alt="" />
                <p className='text-xs'>Simply browse through our extensive list of trusted doctors,<br />
                     schedule your appointment hassle-free.</p>
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-2 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Book appointment <img src={assets.arrow_icon} alt="" className='w-3'/>
            </a>
        </div>

        {/* {----Right-side----} */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}
