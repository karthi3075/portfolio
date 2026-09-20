import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Loading from '../../components/Loading'

export const AdminContact = () => {

    // const [details,setDetails]=useState({})
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    useEffect(() => {
        fetchDetails()
    }, [])
    const { handleSubmit, register, formState: { errors }, reset } = useForm()
    
    const fetchDetails = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/details/view`)
        if (response.data.status) {
            reset({
                email: response.data.details[0].email,
                mobile: response.data.details[0].mobile,
            })
        } else {
            toast.warning("details not loaded")
        }
        setLoading(false)
    }

    const onSubmit = async (data) => {
        setSaveLoading(true)
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/contact/edit`, data)
        if (response.data.status) {
            toast.success("Edited Successfully")
        } else {
            toast.error("Failed to Edit")
        }
        setSaveLoading(false)
    }
    return (
        <div className='h-screen bg-gray-900 text-white pt-20'>
            {!loading &&
                <>
                    <h1 className='text-center text-3xl font-bold mb-5'>Contact Page</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='px-10 flex justify-center'>
                        <div className='w-[50%] flex flex-col gap-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="">Email</label>
                                <input
                                    className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                    type="email"
                                    {...register("email", {
                                        required: "email is required"
                                    })}
                                />
                                {errors.email &&
                                    <p className='text-sm text-red-500'>{errors.email.message}</p>
                                }
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Mobile</label>
                                <input
                                    className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                    type="text"
                                    {...register("mobile", {
                                        required: "mobile number is required"
                                    })}
                                />
                                {errors.mobile &&
                                    <p className='text-sm text-red-500'>{errors.mobile.message}</p>
                                }
                            </div>
                            <button className='px-2 py-1 rounded bg-green-800 w-full cursor-pointer'>Save</button>
                        </div>
                    </form>
                </>
            }
            {loading &&
                <Loading />
            }
        </div>
    )
}
