import React from 'react'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import {toast} from "react-toastify"

const Login = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate=useNavigate();

    const onSubmit=async (data)=>{
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`,data)
        if(response.data.status){
            console.log(response.data)
            navigate("/admin")
        }else{
            toast.error("invalid credentials")
        }
    }

    return (
        <div className='h-screen bg-gray-900 text-white flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-4 border border-purple-600 rounded-md w-100 flex flex-col gap-3'>
                <h1 className='text-3xl font-bold text-center mb-5 text-purple-500'>Welcome Back</h1>
                <div className='flex flex-col'>
                    <label htmlFor="">Email</label>
                    <input 
                        type="email" 
                        className='px-2 py-1 rounded outline outline-purple-600 my-1' 
                        {...register("email",{
                            required:"email is required"
                        })}
                    />
                    {errors.email &&
                        <p className='text-sm text-red-500'>{errors.email.message}</p>
                    }
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Password</label>
                    <input 
                        type="password" 
                        className='px-2 py-1 rounded outline outline-purple-600 my-1' 
                        {...register("password",{
                            required:"password is required"
                        })}
                    />
                    {errors.password &&
                        <p className='text-sm text-red-500'>{errors.password.message}</p>
                    }
                </div>
                <div>
                    <button className='px-2 py-1 bg-green-600 rounded-md w-full cursor-pointer'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login