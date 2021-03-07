import React from 'react'
import { useSelector } from 'react-redux'
import { FaGoogleDrive } from 'react-icons/fa'
import { Dropdown, Image } from 'react-bootstrap'

import firebase from '../../../firebase'

export default function UserPanel() {

    const user = useSelector(state => state.user.currentUser)


    const handleLogout = () => {
        firebase.auth().signOut()
    }


    return (
        <div style={{
            padding:'8px',
            margin: '0 4px'
        }}>
            <h3 style={{ color: '#ffffff', marginBottom: '1rem'}}>
                <FaGoogleDrive />{" "}Chat App
            </h3>
            
            <div style={{display:'flex', marginBottom:'1rem'}}>
                <Image src={user && user.photoURL} roundedCircle
                style={{width:'30px', height:'30px', marginTop:'5px'}} />

                <Dropdown>
                    <Dropdown.Toggle 
                        id="dropdown-basic" 
                        style={{background:'transparent', border:'0'}}
                    >
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item >프로필 사진 변경</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} >로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
