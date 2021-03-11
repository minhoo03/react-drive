import React, { useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import firebase from '../../../firebase'

export default function UploadForm({drive, user}) {


    const [content, setContent] = useState('')
    const [storageRef, setStorageRef] = useState(firebase.storage().ref())
    const [driveMsgRef, setDriveMsgRef] = useState(firebase.database().ref('driveMsg'))

    // const drive = useSelector(state => state.drive.currentDriveRoom)

    const imageRef = useRef()
    const fileRef = useRef()


    const handleImageRefClick = () => {
        imageRef.current.click()
    }


    const handleFileRefClick = () => {
        fileRef.current.click()
    }


    const getPath = () => {
        if(drive.id == user.uid) {
            return `/driveMsg/${drive.id}`
        } else {
            return `/driveMsg/public`
        }
    }


    const handleUploadImage = (e) => {
        const file = e.target.files[0]
        if(!file) return
        const filePath = `${getPath()}/${file.name}`
        const metadata = { contentType:file.metadata }

        // storage 전송
        try {
            let uploadTask = storageRef.child(filePath).put(file,metadata)

            
            uploadTask.on(
                "state_changed",
                UploadTaskSnapshot => {
                    console.log(UploadTaskSnapshot)
                }, 
                err => {
                    console.log(err)
                },

                () => {
                    // upload 완료 후 메시지 전송 (DB에 저장)
                    // 저장된 파일 URL
                    uploadTask.snapshot.ref.getDownloadURL()
                    .then(downloadURL => {
                        driveMsgRef.child(drive.id).push().set(createMessage(downloadURL))
                    })
                }
            )
            // percent
        } catch (error) {
            alert(error)
        }
    }


    const createMessage = (imgURL = null) => {
        const drivemsg = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: user.uid,
                name: user.displayName,
                image: user.photoURL
            }
        }
        if(imgURL !== null) {
            drivemsg["image"] = imgURL
        } else {
            drivemsg["content"] = content
        }
        return drivemsg
    }


    return (
        <div>
            <Dropdown>
                    <Dropdown.Toggle 
                        id="dropdown-basic" 
                        style={{background:'transparent', border:'0', color: 'black', fontSize:'25px'}}
                    >
                        {drive.name} 드라이브
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleImageRefClick} >이미지 업로드</Dropdown.Item>
                        <Dropdown.Item onClick={handleFileRefClick} >파일 업로드</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <input accept="image/jpeg, image/png, image/gif, image/svg" type="file" style={{display:'none'}} ref={imageRef} onChange={handleUploadImage} />
                <input accept=".psd, .js, .html, .css, .scss, .zip, .java, .kotlin, .ppt, .hwp, xxl" type="file" style={{display:'none'}} ref={fileRef} />
        </div>
    )
}
