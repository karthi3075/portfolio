import React from 'react'
import AdminSideBar from '../components/AdminSideBar'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"
import axios from "axios"

const Admin = () => {
    const navigate=useNavigate()
  useEffect(()=>{
      const checkAuth = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/me`)
          if (response.data.user.name !== `${import.meta.env.VITE_NAME}`) {
            navigate('/login')
            return
          }
         
        } catch (error) {
          navigate('/login')
        }
      }
      checkAuth()
  }, [])
    
  return (
    <div>
        <div className=''><AdminNavbar/></div>
        <div className='grid grid-cols-6'>
            <div>
                <AdminSideBar/>
            </div>
            <div className='col-span-5'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Admin