import React from 'react'
import Landing from './pages/User/Landing'
import Navbar from './components/Navbar'
import Skills from './pages/User/Skills'
import Projects from './pages/User/Projects'
import Contact from './pages/User/Contact'
import About from './pages/User/About'
import {motion} from "motion/react"

const Port = () => {
  return (
    <motion.div transition={{duration:2}} className='bg-gray-900'>
        <Navbar/>
        <Landing/>
        <About/>
        <Skills/>
        <Projects/>
        <Contact/>
    </motion.div>
  )
}

export default Port