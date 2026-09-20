import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useForm } from "react-hook-form"
import Loading from '../../components/Loading'
import {toast} from "react-toastify"

const AdminAbout = () => {
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    useEffect(() => {
        fetchDetails()
    }, [])
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: {
            aboutDescription: "",
            aboutImg: ""
        }
    })
    
    const fetchDetails = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/details/view`)
        if (response.data.status) {
            setDetails(response.data.details[0])
            reset({
                aboutDescription: response.data.details[0].aboutDescription,
                aboutImg: response.data.details[0].aboutImg
            })
        } else {
            toast.warning("details not loaded")
        }
        setLoading(false)
    }

    const onSubmit = async (data) => {
        setSaveLoading(true)
        const formData = new FormData()
        formData.append("aboutDescription", data.aboutDescription)
        formData.append("prevImg", details.aboutImg)
        if (data.aboutImg[0]) {
            formData.append("aboutImg", data.aboutImg[0])
        }
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/about/edit`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if (response.data.status) {
            fetchDetails()
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

                    <h1 className='text-center text-3xl font-bold mb-5'>About Page</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='px-10 flex justify-center'>
                        <div className='w-[50%] flex flex-col gap-3'>
                            <div className='flex flex-col '>
                                <label htmlFor="">Describe about me</label>
                                <textarea
                                    className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                    type="text"
                                    {...register("aboutDescription", {
                                        required: "description is required"
                                    })}
                                />
                                {errors.aboutDescription &&
                                    <p className='text-sm text-red-500'>{errors.aboutDescription.message}</p>
                                }
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">About Image</label>
                                <div className='flex gap-2'>
                                    <input
                                        className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                        type="file"
                                        {...register("aboutImg", {
                                            required: false
                                        })}
                                    />
                                    <img width={50} src={`${import.meta.env.VITE_BASE_URL}/uploads/${details.aboutImg}`} alt="" />

                                </div>
                                {errors.aboutImg &&
                                    <p className='text-sm text-red-500'>{errors.aboutImg.message}</p>
                                }
                            </div>
                            <button className='px-2 py-1 rounded bg-green-800 w-full cursor-pointer'>{saveLoading ? "Saving...": "Save"}</button>
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

export default AdminAbout