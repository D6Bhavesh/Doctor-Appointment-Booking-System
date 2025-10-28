import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom' 

export const MyAppointments = () => {
  
  const {backendUrl, token, getDoctorsData} = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  
  const getUserAppointments = async () =>{
    try {
      const {data} = await axios.get(backendUrl + "/api/user/appointments", {headers:{token}})
      if(data.success){
        setAppointments(data.appointments)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) =>{

    console.log(slotDate)
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + month[Number(dateArray[1])] + " " + dateArray[2]

  }

  const cancelAppointment = async (appointmentId) =>{
    try {
      const {data} = await axios.post(backendUrl + "/api/user/cancel-appointment", {appointmentId}, {headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const makePayment = async (appointmentId) =>{

    try {
      const {data} = await axios.post(backendUrl + '/api/user/payment', {appointmentId}, {headers:{token}})
      if (data.success){
        getUserAppointments()
        navigate("/my-appointments")
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  }, [token])

  
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {appointments.map((item, index)=>(
          <div className='grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className="w-32 bg-indigo-50 m-1 rounded" src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              {console.log(item)}
              <p className='text-sm mt-1'><span className='text-smtext-neutral-700 font-medium'>Date & Time </span> {slotDateFormat(item.slotDate)} |{item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=> makePayment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded mb-1 cursor-pointer hover:bg-[#5f6fff] hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && !item.isCompleted && <button onClick={()=> cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded mb-1 hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 text-red-500'>Appointment Cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
          
        ))}
      </div>
    </div>
  )
}
