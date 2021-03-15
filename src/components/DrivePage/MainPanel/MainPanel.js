import React, { Component } from 'react'
import UploadForm from './UploadForm'
import { connect } from 'react-redux'
import firebase from '../../../firebase'


export class MainPanel extends Component {

    
    state = {
        drives: [],
        driveRef: firebase.database().ref("driveMsg"),
        drivesLoading: true,
        driveLength:[]
    }

    componentDidUpdate(prevProps) {
        if(prevProps.drive != this.props.drive) {
            this.addProps()
        }
    }


    addProps = async () => {
        // redux를 가져오기전 끝나버림.
        const {drive} = this.props
        console.log('drive',drive)
        console.log(123213)
        if(drive) {
            console.log('drive',drive.id)
            this.addDrivesListeners(drive.id)
        } 
    }

    // DB 변동 O => state에 msg 담음
    addDrivesListeners = (chatRoomId) => {
        let drivesArr = []
        this.state.driveRef.child(chatRoomId).on("child_added", snapShot => {
            drivesArr.push(snapShot.val())
            this.setState({ 
                drives: drivesArr,
                drivesLoading: false
            })
        })  
    }

    // state의 메세지를 컴포넌트에 보냄
    renderDrives = (drives) => 
        drives.length > 0 && drives.map(drive => (
            // <Message key={message.timestamp} message={message} user={this.props.user} />
            console.log(drive)
    ))
    

    render() {

        const { drives } = this.state

        return (
            <div style={{
                padding:'8px',
                margin:'0 8px'
            }}>
                <UploadForm drive={this.props.drive} user={this.props.user} />
                {drives && this.renderDrives(drives)}
            </div>
        )
    }
}

const mapToStateProps = state => {
    return {
        user: state.user.currentUser,
        drive: state.drive.currentDriveRoom
    }
}
export default connect(mapToStateProps)(MainPanel)
