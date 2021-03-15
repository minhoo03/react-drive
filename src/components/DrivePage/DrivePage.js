import React from 'react'
import { useSelector } from 'react-redux'
import MainPanel from './MainPanel/MainPanel'
import SidePanel from './SidePanel/SidePanel'

export default function DrivePage() {

    const currentDriveRoom = useSelector(state => state.drive.currentDriveRoom)

    return (
        <div style={{display: 'flex'}}>
            <div style={{width:'300px'}}>
                <SidePanel />
            </div>
            <div style={{width:'100%'}}>
                {/* <MainPanel key={currentDriveRoom && currentDriveRoom.id} /> */}
                <MainPanel />
            </div>
        </div>
    )
}
