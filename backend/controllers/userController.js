import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'

const registerUser = async (req, res) =>{

    try {
        
        const {name, email, password} = req.body
    
        if(!name || !email || !password){
            return res.json({success:false, message:"Missing Details"})
        }
    
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"enter a valid email"})
        }
    
        if(password.length < 8){
            return res.json({success:false, message:"enter a strong password"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const userData = {
            name: name,
            email: email,
            password: hashedPassword
        }
    
        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
    
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        }
        else{
            res.json({success:false, message:"Invalid credentials."})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})  
    }
}

const getProfile = async (req, res)=>{
    try {

        const userId = req.userId 
        const userData = await userModel.findById(userId).select("-password")
        res.json({success:true, userData})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message}) 
    }
}

const updateProfile = async (req, res)=>{

    const {name, phone, address, dob, gender} = req.body
    const userId = req.userId
    const imageFile = req.file

    if(!name || !phone || !address || !dob || !gender){
        return res.json({success:false, message:"Data Missing"})
    }
    console.log(userId)
    await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender})

    if(imageFile){
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
        const imageURL = imageUpload.secure_url

        await userModel.findByIdAndUpdate(userId, {image: imageURL})
    }

    res.json({success:true, message:`Profile Updated.${userId}`})
}

const bookAppointment = async (req, res)=>{
    const {docId, slotDate, slotTime} = req.body
    const userId = req.userId

    const docData = await doctorModel.findById(docId).select("-password")

    if (!docData.available){
        return res.json({success:false, message:"Doctor not available."})
    }

    let slots_booked =  docData.slots_booked
    if (slots_booked[slotDate]){
        if (slots_booked[slotDate].includes(slotTime)){
            return res.json({success:false, message:"Slot not available."})
        }else{
            slots_booked[slotDate].push(slotTime)
        }
    }else{
        slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select("-password")

    delete docData.slots_booked

    const appointmentData = {
        userId, 
        docId,
        userData,
        docData,
        amount:docData.fees,
        slotTime,
        slotDate,
        date:Date.now()
    }
    
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})
    res.json({success:true , message:"Appointment Booked."})
}

const listAppointment = async (req, res) =>{
    try {
        const userId = req.userId
    
        const appointments = await appointmentModel.find({userId})
        console.log("controller",appointments)
        res.json({success:true, appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message}) 
    }
}

const cancelAppointment = async (req, res) => {

    const {appointmentId} = req.body
    const userId = req.userId

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(appointmentData.userId !== userId){
        return res.json({success:false, message:"Unauthorized action"})
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

    const {docId, slotDate, slotTime} = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({success:true, message:"Appointment Cancelled"})
}

const payment = async (req, res) => {
    try {
        const userId = req.userId
        const {appointmentId} = req.body

        const appointment = await appointmentModel.findById(appointmentId)

        if (appointment.userId === userId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {payment:true})
            res.json({success:true, message:"Payment Successful"})
        }else{
            res.json({success:true, message:"Payment Failed"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, payment}