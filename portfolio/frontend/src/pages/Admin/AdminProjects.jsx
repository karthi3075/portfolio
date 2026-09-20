import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import EditAdminProject from './EditAdminProject'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'

export const AdminProjects = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [details, setDetails] = useState([])
    const [editId,setEditId]=useState(null)
    const [projectLoading,setProjectLoading]=useState(false)
    const [saveLoading,setSaveLoading]=useState(false)
    const [deleteLoading,setDeleteLoading]=useState(null)

    useEffect(() => {
        fetchProjects()
    }, [])
    
    const fetchProjects = async () => {
        setProjectLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/projects/view`)
        if (response.data.status) {
            setDetails(response.data.projects)
        } else {
            console.log("details not loaded")
        }
        setProjectLoading(false)
    }

    const onSubmit = async (data) => {
        setSaveLoading(true)
        const formData = new FormData()
        formData.append("projectName", data.projectName)
        formData.append("projectImg", data.projectImg[0])
        formData.append("liveLink", data.liveLink)
        formData.append("gitLink", data.gitLink)
        formData.append("description", data.description)

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/projects/add`, formData)
        if (response.data.status) {
            fetchProjects()
            reset()
            toast.success("Project Added Successfully")
        } else {
            toast.error("Failed to Add Project")
        }
        setSaveLoading(false)

    }

     const handleDelete = async (id) => {
        setDeleteLoading(id)
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/projects/delete/${id}`)
        if (response.data.status) {
            fetchProjects()
            toast.success("Project Deleted Successfully")
        } else {
            toast.error("Failed to Delete Project")
        }
        setDeleteLoading(false)
    }

    return (
        <div className='h-screen bg-gray-900 text-white pt-20 overflow-y-auto'>
            <h1 className='text-center text-3xl font-bold mb-5'>Projects Page</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='px-10 grid grid-cols-2 gap-3'>
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
                    <input
                        className='px-2 py-1 rounded outline outline-purple-600 my-1'
                        type="file"
                        {...register("projectImg", {
                            required: "project image is required"
                        })}
                    />
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
                            required:false
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
                            required:false
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
                    <button className='px-2 py-2 rounded bg-green-800 w-full cursor-pointer'>{saveLoading?"Saving...":"Save"}</button>
                </div>
            </form>

            <h1 className='text-3xl font-bold text-center'>Stored Projects</h1>
            {!projectLoading&&
                <div className='p-10 mt-4 grid grid-cols-3 gap-4'>
            
            {details.map((project,index) => (
                    <div key={index} className='p-5 shadow bg-gray-500 inline-block rounded-md flex justify-center items-center'>
                        <div className=''>
                            <img height={50}  src={`${import.meta.env.VITE_BASE_URL}/uploads/${project.projectImg}`} alt="" />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>{project.projectName}</h1>
                            <p className='' style={{whiteSpace:"pre-wrap"}}>{project.description}</p>
                        </div>
                        <p>LinkedIn: {project.liveLink}</p>
                        <p>GitHub: {project.gitLink}</p>
                        <div className='flex gap-5 mt-5'>
                            <button className='rounded-md bg-purple-600 text-white px-4 py-1 cursor-pointer' onClick={()=>{setEditId(project._id)}}>Edit</button>
                            <button className='rounded-md bg-red-500 text-white px-4 py-1 cursor-pointer' onClick={()=>handleDelete(project._id)}>{deleteLoading==project._id ? "Deleting...":"Delete"}</button>
                        </div>
                    </div>
                ))}
                    
            </div>
            }
            {projectLoading&&
                <Loading/>
            }
            

            <div className={`${editId ? "block" : "hidden"}`}>
                {editId && 
                    <EditAdminProject  id={editId} setEditId={setEditId} fetchProjects={fetchProjects}/>
                }
            </div>
            
        </div>
    )
}
