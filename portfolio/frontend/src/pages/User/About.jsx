import React from 'react'
import {useState,useEffect} from "react"
import axios from "axios"
import Loading from '../../components/Loading'
import { Code2, Download, Lightbulb, Target, UsersRound } from 'lucide-react'
import arrow from "../../assets/arrow.png"
import light from "../../assets/light.png"
import code from "../../assets/code.png"
import collabrate from "../../assets/collabrate.png"
import {motion} from "motion/react"


const About = () => {
    const [details, setDetails] = useState({})
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        fetchDetails()
    }, [])
    
    const fetchDetails = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/details/view`)
        if (response.data.status) {
            setDetails(response.data.details[0])
        } else {
            console.log("details not loaded")
        }
        setLoading(false)
    }
    return (
        <>
            {!loading &&
            
           
        <motion.section initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}  id="about" className="section min-h-screen bg-gray-900 text-white p-10 md:p-30 scroll-smooth">
            <div className='grid grid-cols-1 md:grid-cols-2 shadow pb-2'>
                <div className=''>
                    <h2 className='text-purple-600 mt-8 md:mt-0'>ABOUT ME</h2>
                    <h1 className='text-3xl font-bold my-4'>More <span className='text-purple-600'>about me</span></h1>
                    <p className='text-wrap md:w-95' style={{whiteSpace:"pre-wrap"}}>{details.aboutDescription}</p>
                    <div className='inline-block'>
                    <motion.a whileTap={{scale:0.97}} href={`${import.meta.env.VITE_BASE_URL}/uploads/${details.resume}`} className='hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 p-2 rounded-md border-1 cursor-pointer border-purple-600 mt-4 flex gap-3'><Download/>Download Resume</motion.a>
                    </div>
                </div>
                <div className='mt-4 md:mt-0 flex justify-center items-center'>
                    <img src={`${import.meta.env.VITE_BASE_URL}/uploads/${details.aboutImg}`} alt="" />
                </div>
            </div>
            <div className='mt-3'>
                <div className='flex flex-col items-center gap-2'>
                    <h2 className='text-purple-600'>WHAT I VALUE</h2>
                    <h1 className='text-3xl font-bold'>Thinks that drive me forward</h1>
                    <div className='h-[3px] bg-purple-600 w-25'></div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-4'>
                    <div className='p-3 flex gap-3 bg-gray-800 rounded-md outline outline-gray-700'>
                        <div>
                            <Target className='text-purple-500'/>
                        </div>
                        <div>
                            <h2 className='text-md font-bold'>Problem Solver</h2>
                            <div className='h-[3px] w-[50px] bg-purple-600'></div>
                            <p className='text-sm text-wrap'>I love solving real-world problems and turning them into simple solutions.</p>
                        </div>
                    </div>
                    <div className='p-3 flex gap-3 bg-gray-800 rounded-md outline outline-gray-700'>
                        <div>
                            <Lightbulb className='text-purple-500'/>
                        </div>
                        <div>
                            <h2 className='text-md font-bold'>Always Learning</h2>
                            <div className='h-[3px] w-[50px] bg-purple-600'></div>
                            <p className='text-sm text-wrap'>I'm always exploring new technologies and improving my skills.</p>
                        </div>
                    </div>
                    <div className='p-3 flex gap-3 bg-gray-800 rounded-md outline outline-gray-700'>
                        <div>
                            <Code2 className='text-purple-500'/>
                        </div>
                        <div>
                            <h2 className='text-md font-bold'>Clean Code</h2>
                            <div className='h-[3px] w-[50px] bg-purple-600'></div>
                            <p className='text-sm text-wrap'>I write clean, maintainable and well-structured code that's easy to scale.</p>
                        </div>
                    </div>
                    <div className='p-3 flex gap-3 bg-gray-800 rounded-md outline outline-gray-700'>
                        <div>
                            <UsersRound className='text-purple-500'/>
                        </div>
                        <div>
                            <h2 className='text-md font-bold'>Collaboration</h2>
                            <div className='h-[3px] w-[50px] bg-purple-600'></div>
                            <p className='text-sm text-wrap'>I enjoy working with others and believe great things happen in a team.</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
         }
         {loading && 
            <Loading/>
         }
        </>
    )
}

export default About