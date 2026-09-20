import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from "react-toastify"
import EditAdminSkills from "./EditAdminSkills"
import Loading from '../../components/Loading'

const AdminSkills = () => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm()
    const { handleSubmit: skillHandleSubmit, register: skillRegister, formState: { errors: skillErrors }, reset: skillReset } = useForm()
    const [skills, setSkills] = useState([])
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(null)

    useEffect(() => {
        fetchSkills()
    }, [])
    
    const fetchSkills = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/skills/view`)
        if (response.data.status) {
            setSkills(response.data.skills)
        } else {
            toast.warning("Failed to Load")
        }
        setLoading(false)
    }




    const onSubmit = async (data) => {
        setSaveLoading(true)
        const formData = new FormData();
        formData.append("category", data.category)
        formData.append("skill", data.skill)
        formData.append("orderNo", data.orderNo)
        formData.append("logo", data.logo[0])
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/skills/add`, formData)
        if (response.data.status) {
            reset()
            fetchSkills()
            toast.success("Skill Added Successfully")
        } else {
            toast.error("Skill Not Added")
        }
        setSaveLoading(false)
    }

    const handleDelete = async (event, id) => {
        setDeleteLoading(id)
        event.preventDefault()
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/skills/delete/${id}`)
        if (response.data.status) {
            fetchSkills()
            toast.success("Skill Deleted Successfully")
        } else {
            toast.error("Skill Not Deleted")
        }
        setDeleteLoading(false)
    }

    return (
        <div className='h-screen bg-gray-900 text-white pt-20 overflow-y-auto'>
            {!loading &&
                <>
                    <h1 className='text-center text-3xl font-bold mb-5'>Skills Page</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='px-10 grid grid-cols-7 gap-2'>
                        <div className='flex flex-col col-span-2'>
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
                            <input
                                type="file"
                                className='px-2 py-1 rounded outline outline-purple-600 my-1'
                                {...register("logo", {
                                    required: "logo is required"
                                })}
                            />
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
                            <button className='px-2 py-2 rounded bg-green-800 w-full cursor-pointer'>{saveLoading?"Saving...":"Save"}</button>
                        </div>
                    </form>
                    <div className='px-10 my-5'>
                        <table className=''>
                            <thead>
                                <tr className='bg-gray-950'>
                                    <th className='px-5 py-2'>Category</th>
                                    <th className='px-5 py-2'>Skill</th>
                                    <th className='px-5 py-2'>logo </th>
                                    <th className='px-5 py-2'>Order Number </th>
                                    <th className='px-5 py-2 flex gap-3'>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skills.map((data, index) => (
                                    <tr key={index} className='hover:bg-gray-950'>

                                        <td className='px-5 py-2'>{data.category}</td>
                                        <td className='px-5 py-2'>{data.skill}</td>
                                        <td className='px-5 py-2'>
                                            <img width={50} src={`${import.meta.env.VITE_BASE_URL}/uploads/${data.logo}`} alt="" />
                                        </td>
                                        <td className='px-5 py-2'>{data.orderNo}</td>
                                        <td className='px-5 py-2 flex gap-3'>

                                            <button className='px-2 py-2 rounded bg-orange-800 cursor-pointer' onClick={(event) => { setEditId(data._id); event.preventDefault() }}>edit</button>

                                            <button className='px-2 py-2 rounded bg-red-800 cursor-pointer' onClick={(event) => { handleDelete(event, data._id) }}>{deleteLoading == data._id ? "Deleting...":"Delete"}</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <div className={`${editId ? "block" : "hidden"}`}>
                        {editId &&
                            <EditAdminSkills id={editId} setEditId={setEditId} fetchSkills={fetchSkills} />
                        }
                    </div>
                </>
            }
            {loading &&
                <Loading/>
            }
        </div>
    )
}

export default AdminSkills