import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {

  const {targetUserId} = useParams();
  const user = useSelector(store => store.user);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;

  const [messages,setMessages] = useState([]);

  useEffect(() => {
    if(!userId || !targetUserId) return;

    const socket = createSocketConnection();
    // as sson as page loads the socket connection is made and join chat event is emitted
    socket.emit("joinChat",{firstName:user?.firstName ,userId, targetUserId})

    socket.on("messageReceived",({firstName,text}) => {
      // console.log(firstName + " " + text)
      setMessages((messages) => [...messages,{firstName,text}])
    })

    return () => {
      // when the component unmounts, the socket connection is closed
      socket.disconnect();
    }
  },[userId,targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage",{firstName:user.firstName,userId,targetUserId, text:newMessage});
    setNewMessage("");
  }
  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-600'>CHAT</h1>
      <div className='flex-1 overflow-scroll p-5'>
        {/* display messages */}
        {messages.map((msg,index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          )
        })}
      </div>
      <div className='p-5 border-t border-gray-600 flex gap-2 items-center'>
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className='flex-1 border border-gray-500 text-white rounded p-2 '></input>
        <button className='btn btn-secondary' onClick={sendMessage}>send</button>
      </div>
    </div>
  )
}

export default Chat