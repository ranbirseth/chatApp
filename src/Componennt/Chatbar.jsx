import { useState, useEffect } from 'react'
import React from 'react'

import { io } from 'socket.io-client';

function Chatbar() {

    const socket = io("http://localhost:3000/")
    useEffect(() => {
        socket.on('connect', () => {
            console.log(`My user Id is ${socket.id}` )
        })
        socket.on("welcome", (val) => {
            console.log(val , socket.id)
        })
    }, [])


    const [Chat, setChat] = useState("")
    const HandelSend = (e) => {
        setChat(e.target.value)
    }
    const Send = () => {
        console.log(Chat)
        setChat("")

    }

    return (
        <div className=' fixed bottom-0 w-full bg-gray-700  h-[6.5vh] text-white '>
            <input value={Chat} onChange={HandelSend} className='bg-transparent border-2 border-black h-11 p-4 w-[90%]' type="text" name="" id="" placeholder='send a chat' />
            <button onClick={Send} className='bg-purple-900 text-white h-11 w-[10%]' >Send</button>
        </div>

    )
}

export default Chatbar
