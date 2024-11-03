import React, { useMemo } from 'react'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import './style.css';
import { SendHorizontal , User  } from 'lucide-react';
function MainContaner() {
    const [lift, setlift] = useState("")
    const [Chat, setChat] = useState([])
    const [ChatShow, setChatShow] = useState(false)
    const [NotificationShow, setNotificationShow] = useState(false)
    const [Connected, setConnected] = useState()
    const [id, setid] = useState("")

    //connecting through socketio

    const socket = useMemo(() => io("http://localhost:3000/"), [])


    // when a user entered all the users get notification

    let name = useMemo(() => prompt("Enter Your Name :"), [])
    useMemo(() => socket.emit('enterd', name), [])


    socket.on('join', (data) => {
        setConnected(`${data} join chat`)
        setTimeout(() => {
            setConnected('')
        }, 10000);

    })




    console.log(Chat)

    const Send = () => {

        const massage = document.getElementById('Chatinput').value
        ///when sennding a massage
        socket.emit('massage', { massage, id })

        document.getElementById('Chatinput').value = ""



    }




    //// person are connnected and disconnect hear 
    useEffect(() => {

        socket.on('connect', () => {
            console.log("user was  connected")
            setid(socket.id)
        })

        socket.on('leave', (data) => {
            setlift(data)
            setTimeout(() => {
                setlift('')
            }, 10000);
            setChat([...Chat, data])

        })
        //whenever anyone  connect
        socket.on("welcome", (data) => {
            // setChat([...Chat, data])
            console.log(data.user, "send", data.massage)
        })

        return () => {
            socket.emit("disconnect")
            socket.off()
        }



    }, [])

    useEffect(() => {
        socket.on('sendmassage', (data) => {
            setChat([...Chat, data])
            console.log(data.user, data.massage, data.id)
            if (ChatShow == false) {
                setChatShow(true)
            }

        })
        return () => {

            socket.off()
        }

    }, [Chat])






    return (
        <>
<hr />
            <ScrollToBottom className=' min-h-[87vh] z-0 bottom-16 top-16  bg '>
                <div>
                    <p className={`${NotificationShow ? "" : ""}  mt-20 text-white font-bold  ml-[4.6rem]  absolute bottom-[5.5rem] left-[6rem]  `} >{Connected}</p>
                    <br />
                    <div>   <p className=' mt-20  text-white font-bold  ml-[4.6rem]  absolute bottom-[4rem] left-[5rem]  ' >{lift}</p></div>
                </div>

                {Chat.map((item => {
                    return <div key={item.id} className={item.id == id ? "flex clear-both float-right  mt-10 gap-2 ml-3 " : "flex clear-both float-left  mt-10 gap-7 ml-3 "} ><div className={`usrname ${item.id == id ? "invisible" : ""} ${ChatShow ? " text-center chatbg h-8 mt-2 p-2 rounded-sm  pt-1  " : 'invisible'}`}  >
                        <p className='text-white text-[10px] font-bold text-center p-1'>{item.user}</p>
                    </div>
                        <div className={` Massage ${item.id == id ? "chatbg" : "userchatbg"} ${ChatShow ? "   mr-5 p-2  rounded-2xl text-white   " : 'invisible'}`}  >
                            <p className='font-bold  text-xl  mt-1  '>{item.massage}</p>
                        </div>

                    </div>
                }))}




                <div className=' fixed w-full input  flex h-[7.5vh] text-white bottom-0 z-10  '>
                    <input className='  pl-8 rounded-2xl bottom-0 border-[1px] outline-none border-gray-500 h-11 mt-3 ml-12 p-4 w-[70%] send' type="text" name="" id="Chatinput" placeholder='send a chat' />
                    <button onClick={Send} className='inputinner  text-white  w-[15%] ' ><SendHorizontal className='hov ml-8 hover:ml-10'  size={42} strokeWidth={1.5} absoluteStrokeWidth /></button>
                </div>

            </ScrollToBottom>

        </>

    )
}

export default MainContaner



{/* <User size={32} strokeWidth={1.5} absoluteStrokeWidth /> */}