import React, { useState, useEffect } from 'react'
import axios from "axios"
import Loading from '../../components/Loading'
import {motion} from "motion/react"


const Skills = () => {
    const [skills, setSkills] = useState([])
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        fetchSkills()
    }, [])
    
    const fetchSkills = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/skills/show`)
        if (response.data.status) {
            setSkills(response.data.skills)
        } else {
            console.log("not")
        }
        setLoading(false)
    }

    return (
        <>
        {
            !loading &&
        
        <motion.section initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}  id='skills' className=' section scroll-smooth min-h-screen bg-gray-900 text-white pt-20'>
            <div className='flex flex-col items-center gap-3'>
                <h2 className='text-purple-600'>MY SKILLS</h2>
                <h1 className='text-3xl font-bold'>Skills & <span className='text-purple-600'>Technologies</span></h1>
                <div className='w-25 h-[3px] bg-gradient-to-br from-blue-500 to-purple-500 my-2'></div>
                <p className='w-100 text-center'>Technologies and tools I use to build modern, scalable and user-friendly web applications.</p>
            </div>
            <div className='md:px-30 px-10'>
                {skills.map((skill, index) => (
                    <div key={index}>
                        <h1 className='my-3'>{skill._id}</h1>
                        <div className='grid gap-3 grid-cols-3 md:grid-cols-8'>
                            {skill.items.map((item, index) => (
                                <div key={index} className='p-3 bg-gray-700 rounded-md shadow inline-block flex flex-cols  items-center justify-center text-center cursor-pointer hover:outline hover:outline-gray-650 duration'>
                                    <div className='w-full flex justify-center'>
                                        <img width={75} src={`${import.meta.env.VITE_BASE_URL}/uploads/${item.logo}`}  alt="" />

                                    </div>
                                    <p>{item.skill}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
        }
        {loading && 
            <Loading/>
        }
        </>
    )
}

export default Skills