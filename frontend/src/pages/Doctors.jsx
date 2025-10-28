import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export const Doctors = () => {
  
  const {speciality} = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const {doctors} = useContext(AppContext)
  const navigate = useNavigate()

  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
      applyFilter()
  }, [doctors, speciality])
  console.log(speciality  )

  return (

    <div>
      <p className='text-gray-600'>Browse through the doctors specialists.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? "bg-primary text-white": ""}`} onClick={()=> setShowFilter((prev)=> !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex": "hidden sm:flex"}`}>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General physician' ? "bg-indigo-100 text-black" : ''}`} onClick={()=> speciality === "General physician" ? navigate("/doctors") : navigate("/doctors/General physician")}>General Physician</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? "bg-indigo-100 text-black" : ''}`} onClick={()=> speciality === "Gynecologist" ? navigate("/doctors") : navigate("/doctors/Gynecologist")}>Gynecologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? "bg-indigo-100 text-black" : ''}`} onClick={()=> speciality === "Dermatologist" ? navigate("/doctors") : navigate("/doctors/Dermatologist")}>Dermatologists</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? "bg-indigo-100 text-black" : ''}`} onClick={()=> speciality === "Pediatricians" ? navigate("/doctors") : navigate("/doctors/Pediatricians")}>Pediatricians</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-indigo-100 text-black" : ''}`} onClick={()=> speciality === "Neurologist" ? navigate("/doctors") : navigate("/doctors/Neurologist")}>Neurologist</p>
          <p className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist ' ? "bg-indigo-100 text-black" : ''}`} onClick={()=> speciality === "Gastroenterologist" ? navigate("/doctors") : navigate("/doctors/Gastroenterologist")}>Gastroenterologist</p>
        </div>

        <div className='w-full grid autogrid gap-4 gap-y-6'>
          { 
            filterDoc.map((item, index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 cursor-pointer rounded-xl overflow-hidden hover:translate-y-[-10px] transition-all duration-500'>
                     <img className='bg-blue-50' src={item.image} alt="" />
                     <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available?"text-green-500": "text-gray-500"}`}>
                        <p className={`w-2 h-2 ${item.available? "bg-green-500": "bg-gray-500"} rounded-full`}></p><p>{item.available? "Available": "Not Available"}</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-sm'>{item.speciality}</p>
                     </div>
                </div> 
            ))
          }
        </div>
      </div>
    </div>
  )
}
