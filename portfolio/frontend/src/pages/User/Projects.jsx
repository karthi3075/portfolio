import React, { useState, useEffect } from 'react'
import axios from "axios"
import Loading from '../../components/Loading'
import { Share2Icon } from 'lucide-react'
import {motion} from "motion/react"

const Projects = () => {

    const [details,setDetails] = useState([])
    const [loading,setLoading]= useState(false)

    useEffect(() => {
        fetchProjects()
    }, [])
    
    const fetchProjects = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/projects/view`)
        if (response.data.status) {
            setDetails(response.data.projects)
        } else {
            console.log("details not loaded")
        }
        setLoading(false)
    }

    return (
        <>
        {!loading &&
       
        <motion.section initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}  id='projects' className='section scroll-smooth text-white bg-gray-900 min-h-screen pb-5 pt-20'>
            <div className='text-center flex flex-col items-center'>
                <h1 className='text-3xl font-bold'>My <span className='text-purple-600'>Projects</span></h1>
                <div className='w-25 h-[3px] bg-gradient-to-br from-blue-500 to-purple-500 my-2'></div>
                <p>Here are some of the projects I've built.</p>
            </div>
            <div className='md:px-30 p-10 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                {details.map((project,index) => (
                    <div key={index} className='p-5 shadow bg-gray-800 inline-block rounded-md flex justify-center items-center'>
                        <div className='mb-5'>
                            <img height={50}  src={`${import.meta.env.VITE_BASE_URL}/uploads/${project.projectImg}`} alt="" />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>{project.projectName}</h1>
                            <p className='' style={{whiteSpace:"pre-wrap"}}>{project.description}</p>
                        </div>
                        <div className='flex gap-5 mt-5'>
                            {project.liveLink && 
                                <motion.a whileHover={{scale:1.03}} whileTap={{scale:0.97}} href={project.liveLink} className='rounded-md bg-gradient-to-br to-purple-500 from-blue-500 text-white px-4 py-1 cursor-pointer'>View Demo</motion.a>
                            }
                            {project.gitLink &&
                                <motion.a whileTap={{scale:0.97}} href={project.gitLink} className='hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 rounded-md outline text-white px-4 py-1 cursor-pointer'>GitHub</motion.a>
                            }
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

export default Projects