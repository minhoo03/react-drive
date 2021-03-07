import React from 'react'
import MainPanel from './MainPanel/MainPanel'
import SidePanel from './SidePanel/SidePanel'

export default function DrivePage() {
    return (
        <div style={{display: 'flex'}}>
            <div>
                <SidePanel />
            </div>
            <div style={{width:'100%'}}>
                <MainPanel />
            </div>
        </div>
    )
}
