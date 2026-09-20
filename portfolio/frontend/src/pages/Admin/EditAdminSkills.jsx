import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'

const EditAdminSkills = ({ id, setEditId, fetchSkills }) => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [logo, setLogo] = useState("")
    const [saveLoading, setSaveLoading] = useState(false)

    useEffect(() => {
        fetchDetail()
    }, [])
    
    const fetchDetail = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/skills/view/${id}`)
        if (response.data.status) {
            setLogo(response.data.skill[0].logo)
            reset({
                category: response.data.skill[0].category,
                skill: response.data.skill[0].skill,
                logo: response.data.skill[0].logo,
                orderNo: response.data.skill[0].orderNo
            })
        } else {
            toast.warning("details not loaded")
        }
        setLoading(false)
    }

    const onSubmit = async (data) => {
        setSaveLoading(true)
        const formData = new FormData()
        formData.append("category", data.category)
        if (data.logo[0]) {
            formData.append("logo", data.logo[0])
        }
        formData.append("skill", data.skill)
        formData.append("id", id)
        formData.append("orderNo", data.orderNo)
        formData.append("prevLogo",logo)

        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/skills/edit`, formData)
        if (response.data.status) {
            setEditId(null)
            fetchSkills()
            toast.success("Edited Successfully")
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
                    <form onSubmit={handleSubmit(onSubmit)} className='px-10 flex flex-col mt-6 gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="">Category</label>
                            <select className='px-2 py-1 rounded bg-gray-800 outline outline-purple-600 my-1'
                                {...register("category", {
                                    required: "category is required"
                                })}>
                                <option value="">--Select--</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Tools & Technologies">Tools & Technologies</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.category &&
                                <p className='text-sm text-red-500'>{errors.category.message}</p>
                            }
                        </div>
                        <div className='flex flex-col col-span-2'>
                            <label htmlFor="">Skill</label>
                            <input
                                type="text"
                                className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                {...register("skill", {
                                    required: "skill is required"
                                })}
                            />
                            {errors.skill &&
                                <p className='text-sm text-red-500'>{errors.skill.message}</p>
                            }
                        </div>
                        <div className='flex flex-col col-span-2'>
                            <label htmlFor="">Logo</label>
                            <div className='flex gap-8'>
                                <input
                                    type="file"
                                    className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                    {...register("logo", {
                                        required: false
                                    })}
                                />
                                <img width={25} src={`${import.meta.env.VITE_BASE_URL}/uploads/${logo}`} />
                            </div>
                            {errors.logo &&
                                <p className='text-sm text-red-500'>{errors.logo.message}</p>
                            }
                        </div>
                        <div className='flex flex-col col-span-2'>
                            <label htmlFor="">Order Number</label>
                            <input
                                type="text"
                                className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                {...register("orderNo", {
                                    required: "order number is required"
                                })}
                            />
                            {errors.orderNo &&
                                <p className='text-sm text-red-500'>{errors.orderNo.message}</p>
                            }
                        </div>
                        <div className='flex items-end'>
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

export default EditAdminSkills