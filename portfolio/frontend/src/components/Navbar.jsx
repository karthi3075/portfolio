import { Menu } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Navbar = () => {

	const [active, setActive] = useState('home');
	const [open,setOpen]=useState(false)

	useEffect(() => {
		const sections = document.querySelectorAll(".section")
		const handleScroll = () => {
			sections.forEach((section) => {
				const top = window.scrollY;
				const offset = section.offsetTop - 100;
				const height = section.offsetHeight;
				const id = section.getAttribute("id");

				if (top >= offset && top < offset + height) {
					setActive(id);
				}
			})
		}

		window.addEventListener("scroll", handleScroll);
		handleScroll()

		return (() => { window.removeEventListener("scroll", handleScroll) })
	})

	const links = ["home", "about", "skills", "projects", "contact"]

	return (
		<>
			<nav className='text-white bg-gray-950 flex justify-between items-center p-4 px-10 md:px-20 border-b-1 border-black fixed top-0 left-0 right-0 z-1'>
				<h1 className='text-2xl font-bold'>J<span className='text-purple-700'>K</span></h1>
				<button className='p-2 block md:hidden' onClick={()=>setOpen(!open)}><Menu className="text-purple-600"/></button>
				<div className='hidden md:block '>
					<div className='flex gap-5'>
						{links.map((link) => (
							<a key={link} href={`#${link}`} onClick={()=>{setActive(link)}} className={`capitalize inline-block ${active === link ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 hover:text-blue-500"}`} >{link}</a>
						))}
					</div>
				</div>

			</nav>
			<ul className={` ${open ? "block" : "hidden"} md:hidden bg-gray-950 text-white fixed top-15 left-0 right-0 z-1`}>
				{links.map((link, index) => (
					<a key={link} href={`#${link}`} onClick={()=>{setOpen(false)}}>
					<li className={`capitalize ${active === link ? "text-blue-500 bg-gray-800 " : "text-gray-500 hover:text-blue-500 hover:bg-gray-800"} p-2`}>
						{link}
					</li>
					</a>
				))}
			</ul>
		</>
	)
}

export default Navbar