import React from 'react'
import UserPanel from './UserPanel'

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
        </div>
    )
}
