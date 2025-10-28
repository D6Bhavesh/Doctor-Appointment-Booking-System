import { createContext } from "react"
import { useState } from "react"
import {toast} from 'react-toastify'
import axios from 'axios'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) =>{
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken'): "")
    const[appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)
    
    const getAppointments = async () =>{
        try {
            console.log(backendUrl)
            const {data}  = await axios.get(backendUrl + "/api/doctor/appointments", {headers:{dToken}})

            console.log("data found",data)
            console.log(data.appointments.reverse())
            if(data.success){
                console.log("success here")
                setAppointments(data.appointments)
                console.log(appointments)
            }else{
                console.log("error here")
                toast.error(data.message)   
            }
        } catch (error) {
            console.log(error.message)
            console.log("exception here")

            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) =>{
        try {
            const{data} = await axios.post(backendUrl + "/api/doctor/complete-appointment", {appointmentId},{headers:{dToken}}) 
            if (data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error.message)
            console.log("exception here")

            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) =>{
        try {
            const{data} = await axios.post(backendUrl + "/api/doctor/cancel-appointment", {appointmentId},{header:{dToken}}) 
            if (data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error.message)
            console.log("exception here")

            toast.error(error.message)
        }
    }

    const getDashData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/dashboard", {headers:{dToken}})
            if (data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            console.log("exception here")

            toast.error(error.message)
        }
    }

    const getProfileData = async ()=>{
        try {
            const{data} = await axios.get(backendUrl + "/api/doctor/profile", {headers:{dToken}})
            if(data.success){
                console.log(data.profileData)
                setProfileData(data.profileData)
                // console.log(profileData)
            }
        } catch (error) {
            console.log(error.message)
            console.log("exception here")

            toast.error(error.message)
        }
    }


    const value = {
        dToken,
        backendUrl,
        setDToken,
        getAppointments,
        appointments,
        completeAppointment,
        cancelAppointment,
        getDashData,
        dashData,
        setDashData,
        profileData,
        setProfileData,
        getProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider