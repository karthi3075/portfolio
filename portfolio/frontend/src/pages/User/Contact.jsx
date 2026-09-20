import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'
import call from "../../assets/call.png"
import gmail from "../../assets/gmail.png"
import whatsapp from "../../assets/whatsapp.png"
import linkedin from "../../assets/linkedin.png"
import github from "../../assets/github.png"
import {motion} from "motion/react"

const Contact = () => {
    const [details, setDetails] = useState({})
    const [loading,setLoading]=useState(false)
    const [btnLoading,setBtnLoading]=useState(false)

    const { reset, handleSubmit, register, formState: { errors } } = useForm()
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

    const onSubmit = async (data) => {
        setBtnLoading(true)
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/send-message`,data)
        if(response.data.status){
            toast.success("mail send successfully")
        }else{
            toast.error("There is an problem to send mail")
        }
        setBtnLoading(false)
    }
    return (
        <>
            {!loading &&
            
        <motion.section initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}  id='contact' className='section scroll-smooth min-h-screen bg-gray-900 text-white pt-20 flex flex-col justify-center'>
            <div className='px-10 md:px-30 grid grid-cols-1 md:grid-cols-2'>
                <div className=''>
                    <h1 className='text-purple-600'>GET IN TOUCH</h1>
                    <h1 className='font-bold text-4xl my-3'>Let's <span className='text-purple-600'>Connect</span></h1>
                    <p className='w-75 text-wrap'>Have a question, opportunity or just want to say hello? Feel free to react out!</p>
                    <div className='flex flex-col gap-3 mt-3 mb-5 md:mb-0'>
                        <div className='flex gap-4'>
                            <div className='flex justify-center items-center'>
                                <img src={gmail} alt="" />
                            </div>
                            <div className=''>
                                <h2>Email</h2>
                                <a href={`mailto:${details.email}`} className='text-sm text-blue-500'>{details.email}</a>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex justify-center items-center'>
                                <img width={50} src={whatsapp} alt="" />
                                
                            </div>
                            <div className=''>
                                <h2>Whatsapp</h2>
                                <a href="https://wa.me/919123557302" className='text-sm text-blue-500'>{details.mobile}</a>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex justify-center items-center'>
                                <img width={50} src={call} alt="" />
                            </div>
                            <div className=''>
                                <h2>Mobile</h2>
                                <a href="tel:+919123557302" className='text-sm text-blue-500'>{details.mobile}</a>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex justify-center items-center'>
                                <img src={linkedin} alt="" />
                            </div>
                            <div className=''>
                                <h2>LinkedIn</h2>
                                <a href={details.linkedin} className='text-sm text-blue-500'>{details.linkedin}</a>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex justify-center items-center'>
                                <img width={50} src={github} alt="" />
                            </div>
                            <div className=''>
                                <h2>GitHub</h2>
                                <a href={details.github} className='text-sm text-blue-500'>{details.github}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='rounded-lg border-1 border-purple-500 p-5'>
                        <h1>Send me a Message</h1>
                        <p>I'll get back to you as soon as possible.</p>
                        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
                            <div className='grid grid-cols-1 md:grid-cols-2 mt-3 gap-3'>
                                <div className='flex flex-col'>
                                    <input type="text"
                                        placeholder='Your name'
                                        className='px-2 py-1 rounded border border-white'
                                        {...register("name", {
                                            required: "name is required"
                                        })
                                        }
                                    />
                                    {errors.name &&
                                        <p className='text-sm text-red-500'>{errors.name.message}</p>
                                    }
                                </div>
                                <div>
                                    <input type="email"
                                        placeholder='Your Email'
                                        className='px-2 py-1 rounded border border-white w-full'
                                        {...register("email", {
                                            required: "email is required"
                                        })
                                        }
                                    />
                                    {errors.email &&
                                        <p className='text-sm text-red-500'>{errors.email.message}</p>
                                    }
                                </div>
                            </div>
                            <div>
                                <input type="text"
                                    placeholder='Your Subject'
                                    className='px-2 py-1 rounded border border-white w-full'
                                    {...register("subject", {
                                        required: "subject is required"
                                    })
                                    }
                                />
                                {errors.subject &&
                                    <p className='text-sm text-red-500'>{errors.subject.message}</p>
                                }
                            </div>
                            <div>
                                <textarea type="text"
                                    placeholder='Enter Message'
                                    className='px-2  rounded border border-white w-full'
                                    {...register("message", {
                                        required: "message is required"
                                    })
                                    }
                                />
                                {errors.message &&
                                    <p className='text-sm text-red-500'>{errors.message.message}</p>
                                }
                            </div>
                            <motion.button whileTap={{scale:0.97}} className='rounded-md bg-gradient-to-br from-blue-500 to-purple-500 px-5 py-1 cursor-pointer'>{btnLoading ? "Sending...": "Send"}</motion.button>
                        </form>
                    </div>
                </div>
            </div>
            <p className='text-center py-5'>Let's create something amazing together! 💜</p>
        </motion.section>
        }
        {loading&&
            <Loading/>
        }
        </>
    )
}

export default Contact