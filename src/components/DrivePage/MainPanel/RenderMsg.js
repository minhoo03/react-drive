import React, { useEffect, useState } from 'react'
import firebase from '../../../firebase'

export default function RenderMsg({drive, user}) {


    const [messages, setMessages] = useState([])
    const [messageRef, setMessageRef] = useState(firebase.database().ref("driveMsg"))
    const [messagesLoading, setMessagesLoading] = useState(true)

    // 각 방 구분
    useEffect(() => {
        console.log('drive ================',drive)
        console.log(123213)
        if(drive) {
            addMessagesListeners(drive.id)
        }
    }, [])

    // DB 변동 O => state에 msg 담음
    const addMessagesListeners = (chatRoomId) => {
        let messagesArr = []

        messageRef.child(chatRoomId).on("child_added", snapShot => {
            messagesArr.push(snapShot.val())

            setMessages(messagesArr)
            setMessagesLoading(false)
        })  
    }



    // state의 메세지를 컴포넌트에 보냄
    const renderMessages = (messages) => 
        messages.length > 0 && messages.map(message => (
            // <Message key={message.timestamp} message={message} user={this.props.user} />
            console.log(message)
    ))



    return (
        <div>
            {messages && renderMessages(messages)}
            {drive && drive.id}{" "}
        </div>
    )
}
