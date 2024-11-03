import React from 'react'
import './style.css';

function Navbar() {
    return (
        <nav className='bg h-[6.5vh] z-20 top-0  border-b-[1px] pb-11 fixed w-full flex justify-around p-5  ' >
           <h1 className='font-bold text-white p-2 '>chat App </h1>
            <ul className='flex  gap-7 p-2 text-white'>
                <li>Members</li>
                <li> Profile</li>
                <li>Exit</li>
            </ul>
        </nav>
    )
}

export default Navbar
