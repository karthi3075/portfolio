import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'

const EditAdminProject = ({ id, setEditId, fetchProjects }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const [details, setDetails] = useState({})
    const [projectImg, setProjectImg] = useState("")
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)

    useEffect(() => {
        fetchDetail()
    }, [])
    
    const fetchDetail = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/projects/view/${id}`)
        if (response.data.status) {
            setProjectImg(response.data.project[0].projectImg)
            reset({
                projectName: response.data.project[0].projectName,
                projectImg: response.data.project[0].projectImg,
                liveLink: response.data.project[0].liveLink,
                gitLink: response.data.project[0].gitLink,
                description: response.data.project[0].description,
            })
        } else {
            toast.warning("details not loaded")
        }
        setLoading(false)
    }

    const onSubmit = async (data) => {
        setSaveLoading(true)
        const formData = new FormData()
        formData.append("projectName", data.projectName)
        if (data.projectImg[0]) {
            formData.append("projectImg", data.projectImg[0])
        }
        formData.append("liveLink", data.liveLink)
        formData.append("id", id)
        formData.append("gitLink", data.gitLink)
        formData.append("description", data.description)
        formData.append("prevProjectImg",projectImg)
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/projects/edit`, formData)
        if (response.data.status) {
            setEditId(null)
            fetchProjects()
            toast.success("Project Edited Successfully")
        } else {
            toast.error("Failed to Edit")
        }
        setSaveLoading(false)
    }
    return (
        <div className='fixed top-30 left-30 right-30 bg-gray-950 p-4 rouned-md'>
            {!loading &&
                <>
                    <div className='relative'>
                        <button className='p-1 text-red-600 rounded-md absolute right-0 text-2xl cursor-pointer' onClick={() => { setEditId(null) }}>X</button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='px-10 grid grid-cols-2 gap-3 mt-6'>
                        <div className='flex flex-col'>
                            <label htmlFor="">Project Name</label>
                            <input
                                className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                type="text"
                                {...register("projectName", {
                                    required: "project name is required"
                                })}
                            />
                            {errors.projectName &&
                                <p className='text-sm text-red-600'>{errors.projectName.message}</p>
                            }
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="">Image</label>
                            <div className='flex gap-8'>
                                <input
                                    className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                    type="file"
                                    {...register("projectImg", {
                                        required: false
                                    })}
                                />
                                <img src={projectImg} width={25} alt="" />
                            </div>
                            {errors.projectImg &&
                                <p className='text-sm text-red-600'>{errors.projectImg.message}</p>
                            }
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Live Link</label>
                            <input
                                className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                type="url"
                                {...register("liveLink", {
                                    required: false
                                })}
                            />
                            {errors.liveLink &&
                                <p className='text-sm text-red-600'>{errors.liveLink.message}</p>
                            }
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">GitHub Link</label>
                            <input
                                className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                type="text"
                                {...register("gitLink", {
                                    required: false
                                })}
                            />
                            {errors.gitLink &&
                                <p className='text-sm text-red-600'>{errors.gitLink.message}</p>
                            }
                        </div>
                        <div className='flex flex-col col-span-2'>
                            <label htmlFor="">Project Description</label>
                            <textarea
                                className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                type="text"
                                {...register("description", {
                                    required: "description is required"
                                })}
                            />
                            {errors.description &&
                                <p className='text-sm text-red-600'>{errors.description.message}</p>
                            }
                        </div>
                        <div className='flex items-end col-span-2 mb-4'>
                            <button className='px-2 py-2 rounded bg-green-800 w-full cursor-pointer'>{saveLoading ? "Saving..." : "Save"}</button>
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

export default EditAdminProject