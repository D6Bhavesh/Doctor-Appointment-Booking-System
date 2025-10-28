import React, { useState } from 'react'
import  {assets}  from '../assets/assets'



const AiPage = () => {

    const [xrayImg, setXrayImg] = useState(false)

    const onSubmitHandler = async (event)=>{
        event.preventDefault()
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full' action="">
            <div className='flex flex-col'>
                <div className='flex flex-row  bg-white px-8 py-8 gap-2 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                    <label htmlFor="xray">
                        <p className='text-lg font-medium'>Upload Chest Xray</p>
                        <img  className='w-16 bg-gray-100 rounded-full  cursor-pointer' src={xrayImg? URL.createObjectURL(xrayImg): assets.chats_icon} alt="" />
                    </label>
                    <input onChange={(e)=> setXrayImg(e.target.files[0])} className='border border-gray-600 rounded-lg' type="file" name="" id="xray" hidden/>
                </div>
                <div className='flex flex-col gap-3 items-start p-8 min-w-[100px] sm:min-w-96 max-w-[150px] border rounded-xl text-zinc-600 '>
                    <h3 className='text-lg font-medium'>Enter Your Information</h3>
                    <div>
                        <p>Name:</p>
                        <input className='rounded-lg border border-gray-700' type="text" />
                    </div>
                    <div>
                        <p>Age:</p>
                        <input className='rounded-lg border border-gray-700' type="number" />
                    </div>
                    <div>
                        <p>BMI:</p>
                        <input className='rounded-lg border border-gray-700' type="number" />
                    </div>
                    <button className='bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full cursor-pointer' type='submit'>Upload</button>
                </div>
            </div>    
        </form>
  )
}

export default AiPage