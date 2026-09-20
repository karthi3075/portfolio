import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const AdminSideBar = () => {

    const navigate=useNavigate()

    const logout = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/logout`)
      } catch (error) {
        console.error(error)
      }
      navigate("/login")
    }

    return (
        <div className='pt-20 h-screen relative bg-gray-800 '>
            <ul className='text-white '>
                <li className='p-2 cursor-pointer hover:bg-gray-900'><Link to="landing">Landing Page</Link></li>
                <li className='p-2 cursor-pointer hover:bg-gray-900'><Link to="about">About Page</Link></li>
                <li className='p-2 cursor-pointer hover:bg-gray-900'><Link to="skills">Skills Page</Link></li>
                <li className='p-2 cursor-pointer hover:bg-gray-900'><Link to="projects">Projects Page</Link></li>
                <li className='p-2 cursor-pointer hover:bg-gray-900'><Link to="contact">Contact Page</Link></li>
            </ul>
            <div className='absolute bottom-2 right-1 left-1'>
                <button onClick={logout} className='px-2 py-1 bg-red-500 rounded-md text-white cursor-pointer w-full'>Logout</button>
            </div>
        </div>
    )
}

export default AdminSideBar