import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import {toast} from "react-toastify"

const AdminLanding = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [saveLoading,setSaveLoading]=useState(false)

    useEffect(() => {
        fetchDetails()
    }, [])
    
    const fetchDetails = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/details/view`)
        if (response.data.status) {
            setDetails(response.data.details[0])
            reset({
                fname: response.data.details[0].fname,
                lname: response.data.details[0].lname,
                role: response.data.details[0].role,
                linkedin: response.data.details[0].linkedin,
                github: response.data.details[0].github,
                resume: response.data.details[0].resume,
                photo: response.data.details[0].photo,
                description: response.data.details[0].description
            })
        } else {
            toast.warning("details not loaded")
        }
        setLoading(false)
    }

    const onSubmit = async (data) => {
        setSaveLoading(true)
        const formData = new FormData()
        formData.append("fname", data.fname)
        formData.append("lname", data.lname)
        formData.append("role", data.role)
        formData.append("linkedin", data.linkedin)
        formData.append("github", data.github)
        if (data.resume[0]) {
            formData.append("resume", data.resume[0])
        }
        formData.append("prevPhoto", details.photo)
        formData.append("prevResume", details.resume)
        if (data.photo[0]) {
            formData.append("photo", data.photo[0])
        }
        formData.append("description", data.description)

        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/landing/edit`, formData)
        if (response.data.status) {
            fetchDetails()
            toast.success("Edited Successfully")
        } else {
            toast.error("Failed to Edit")
        }
        setSaveLoading(false)
    }

    return (
        <div className='h-screen bg-gray-900 text-white pt-20 overflow-y-auto pb-10'>
            {!loading &&
            <>
                <h1 className='text-center text-3xl font-bold mb-5'>Landing Page</h1>
                <form action="" onSubmit={handleSubmit(onSubmit)} className='px-10 grid grid-cols-2 gap-3'>
                    <div className='flex flex-col'>
                        <label htmlFor="">First Name</label>
                        <input
                            className='px-2 py-1 rounded outline outline-purple-600 my-1'
                            type="text"
                            {...register("fname", {
                                required: "first name is required"
                            })}
                        />
                        {errors.fname &&
                            <p className='text-sm text-red-600'>{errors.fname.message}</p>
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Last Name</label>
                        <input
                            className='px-2 py-1 rounded outline outline-purple-600 my-1'
                            type="text"
                            {...register("lname", {
                                required: "last name is required"
                            })}
                        />
                        {errors.lname &&
                            <p className='text-sm text-red-600'>{errors.lname.message}</p>
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Role</label>
                        <input
                            className='px-2 py-1 rounded outline outline-purple-600 my-1'
                            type="text"
                            {...register("role", {
                                required: "rele is required"
                            })}
                        />
                        {errors.role &&
                            <p className='text-sm text-red-600'>{errors.role.message}</p>
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">LinkedIn</label>
                        <input
                            className='px-2 py-1 rounded outline outline-purple-600 my-1'
                            type="url"
                            {...register("linkedin", {
                                required: "LinkedIn url is required"
                            })}
                        />
                        {errors.linkedin &&
                            <p className='text-sm text-red-600'>{errors.linkedin.message}</p>
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">GitHub</label>
                        <input
                            className='px-2 py-1 rounded outline outline-purple-600 my-1'
                            type="url"
                            {...register("github", {
                                required: "GitHub url is required"
                            })}
                        />
                        {errors.github &&
                            <p className='text-sm text-red-600'>{errors.github.message}</p>
                        }
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Resume</label>
                        <input
                            className='px-2 py-1 rounded outline outline-purple-600 my-1'
                            type="file"
                            {...register("resume", {
                                required: false
                            })}
                        />
                        {errors.resume &&
                            <p className='text-sm text-red-600'>{errors.resume.message}</p>
                        }
                    </div>
                    <div className='flex gap-3 '>
                        <div className='flex flex-col'>
                            <label htmlFor="">Photo</label>
                            <input
                                className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                type="file"
                                {...register("photo", {
                                    required: false
                                })}
                            />
                            {errors.photo &&
                                <p className='text-sm text-red-600'>{errors.photo.message}</p>
                            }
                        </div>
                        <img src={`${import.meta.env.VITE_BASE_URL}/uploads/${details.photo}`} width={50} alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Description</label>
                        <textarea
                            className='px-2 py-1 rounded outline outline-purple-600 my-1'
                            type="text"
                            {...register("description", {
                                required: "description is required"
                            })}
                        ></textarea>
                        {errors.description &&
                            <p className='text-sm text-red-600'>{errors.description.message}</p>
                        }
                    </div>
                    <div className='col-span-2'>
                        <button className='px-2 py-1 rounded bg-green-800 w-full cursor-pointer'>{saveLoading ? "Saving...":"Save"}</button>
                    </div>
                </form>
                </>
            }
            {loading && 
                <Loading/>
            }
        </div>
    )
}

export default AdminLanding