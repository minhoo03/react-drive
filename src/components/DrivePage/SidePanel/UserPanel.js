import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaGoogleDrive } from 'react-icons/fa'
import { Dropdown, Image } from 'react-bootstrap'

import { setPhotoURL } from '../../../Redux/actions/user_action'

import firebase from '../../../firebase'

export default function UserPanel() {

    const user = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()


    const handleLogout = () => {
        firebase.auth().signOut()
    }


    const inputOpenImageRef = useRef()


    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click()
    }


    const handleUploadImageRef = async (e) => {
        const file = e.target.files[0]

        const metadata = file.type

        try {
            let uploadSnapshot = await firebase.storage().ref()
            .child(`user_image/${user.uid}`)
            .put(file, metadata)

            let downloadURL = await uploadSnapshot.ref.getDownloadURL()

            // save photoURL in auth()
            await firebase.auth().currentUser.updateProfile({
                photoURL: downloadURL
            })

            dispatch(setPhotoURL(downloadURL))

            // save photoURL in database()
            await firebase.database().ref('users')
            .child(user.uid)
            .update({image: downloadURL})

        } catch (error) {
            alert(error)
        }
    }


    return (
        <div style={{
            padding:'16px',
            margin: '0 8px'
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
                        <Dropdown.Item onClick={handleOpenImageRef} >프로필 사진 변경</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} >로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <input accept="image/jpeg, image/png" type="file" style={{display: 'none'}} ref={inputOpenImageRef} onChange={handleUploadImageRef} />
        </div>
    )
}
