import React from 'react'
import { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import { useEffect } from 'react'
import Loading from "../../components/Loading"
import {Download} from "lucide-react"
import linkedin from "../../assets/linkedin.png"
import github from "../../assets/github.png"
import {motion} from "motion/react"

const Landing = () => {

    const [details,setDetails]=useState({})
    const [api,setApi]=useState(import.meta.env.VITE_BASE_URL)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        fetchDetails()
    },[])
    
    const fetchDetails=async()=>{
        setLoading(true)
        const response=await axios.get(`${api}/details/view`)
        if(response.data.status){
            setDetails(response.data.details[0])
        }else{
            console.log("details not loaded")
        }
        setLoading(false)
    }

  return (
    <>
    {!loading && 
    <motion.section  initial={{opacity:0 ,y:50}} animate={{opacity:1, y:0}} transition={{duration:0.8}} id='home' className='section grid grid-cols-1 md:grid-cols-2 flex items-center h-screen bg-gray-900 text-white p-20 md:px-40 px-10 scroll-smooth' >
        <div>
            <h2 className='text-purple-600'>Hello, I'm</h2>
            <h1 className='text-6xl font-bold my-2'>{details.fname} <span className='text-purple-600'>{details.lname}</span></h1>
            <h2 className='text-purple-600 text-2xl'>{details.role}</h2>
            <p className='my-2 w-75 md:w-100'>{details.description}</p>
            <div className='flex gap-5 mt-8'>
                <motion.a whileHover={{scale:1.03}} whileTap={{scale:0.97}} href={`${import.meta.env.VITE_BASE_URL}/uploads/${details.resume}`} className='p-2 rounded-md  bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer flex gap-3'><Download/> Download Resume</motion.a>
                <motion.a whileTap={{scale:0.97}} href={details.linkedin} className='p-2 rounded-md border border-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500'><img src={linkedin} width={25} /></motion.a>
                <motion.a whileTap={{scale:0.97}} href={details.github} className='p-2 rounded-md  border border-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 '><img src={github} width={25} className=""/></motion.a>
            </div>
        </div>
        <motion.div whileHover={{scale:1.02}} transition={{duration:0.8}} className='flex justify-center items-center relative my-5 md:my-0'>
            <div className='p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-70  md:my-0 w-75 h-75'>
            </div>
            <img src={`${import.meta.env.VITE_BASE_URL}/uploads/${details.photo}`} className='rounded-full  w-75 h-75 absolute ' alt="" />
        </motion.div>
    </motion.section>
}
    {loading &&
        <Loading/>
    }
    </>
  )
}

export default Landing