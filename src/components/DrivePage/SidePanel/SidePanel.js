import React from 'react'
import UserPanel from './UserPanel'
import DriveRooms from './DriveRooms'

export default function SidePanel() {
    return (
        <div style={{
            backgroundColor: '#7B83EB',
            paddding:'2rem',
            minHeight:'100vh',
            color: 'white',
            minWidth: '275px'
        }}>
            <UserPanel />
            <DriveRooms />
        </div>
    )
}
