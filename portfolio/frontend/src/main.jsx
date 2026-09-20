import { createRoot } from 'react-dom/client'
import './index.css'
import Port from './Port'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import Admin from './Layout/Admin'
import AdminLanding from './pages/Admin/AdminLanding'
import AdminAbout from './pages/Admin/AdminAbout'
import { AdminContact } from './pages/Admin/AdminContact'
import AdminSkills from './pages/Admin/AdminSkills'
import { AdminProjects } from './pages/Admin/AdminProjects'
import Login from './pages/Admin/Login'
import axios from "axios"

axios.defaults.withCredentials=true
createRoot(document.getElementById('root')).render(
	<>
		<BrowserRouter>
			<Routes>
				<Route index element={<Port/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path="/admin" element={<Admin/>}>
					<Route index element={<AdminLanding/>}/>
					<Route path="landing" element={<AdminLanding/>}/>
					<Route path="about" element={<AdminAbout/>}/> 
					<Route path="skills" element={<AdminSkills/>}/> 
					<Route path="projects" element={<AdminProjects/>}/> 
					<Route path="contact" element={<AdminContact/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
		<ToastContainer position='top-center' autoClose={3000} pauseOnHover closeOnClick/>
	</>
)
