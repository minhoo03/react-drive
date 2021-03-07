import React from 'react'
import { useSelector } from 'react-redux'
import { FaGoogleDrive } from 'react-icons/fa'
import { Dropdown, Image, Container, Row, Col } from 'react-bootstrap'

export default function UserPanel() {

    const user = useSelector(state => state.user.currentUser)

    return (
        <div style={{display: 'flex', flexDirection:'column', padding:'1rem'}}>
            <h4>
                <FaGoogleDrive style={{marginBottom:'2px', color:'white'}} />{" "}React drive
            </h4>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'transparent', border:'none'}}>
                        <Image src={user && user.photoURL} roundedCircle style={{ width: '30px', height:'30px', margin:'4px 8px' }} />
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
