import React, { Component } from 'react'
import UploadForm from './UploadForm'
import { connect } from 'react-redux'
import firebase from '../../../firebase'

import { BsCardImage } from 'react-icons/bs'


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
            <div className="render_img_div"><img src={drive.image} style={{width:'50px', height:'50px'}} /><span>업로더 : {drive && drive.user.name}</span></div>

            // <div><h2><BsCardImage /></h2> <button onClick={this.alertDrive(drive)}>드랍</button></div>
        )
    )

    renderDrives2 = (drives) => 
        drives.length > 0 && drives.map(drive => (
            <div className="render_img_img"><img src={drive.image} style={{width:'100%', height:'60vh', margin: '0 auto'}} /><p>최근 업로드 사진</p><span>업로더 : {drive && drive.user.name}</span></div>

            // <div><h2><BsCardImage /></h2> <button onClick={this.alertDrive(drive)}>드랍</button></div>
        )
    )
    // drives가 없을 경우엔 DB 렌더를 안하니 <img>를 바꾸지 않아
    // 빈 화면이 뜨지 않음. 그 외엔 외관 꾸미기만 남음
    // 아니면 파일과 이미지 구분 정도..?
    

    render() {

        const { drives } = this.state

        return (
            <div style={{
                padding:'8px',
                margin:'0 8px'
            }}>
                <UploadForm drive={this.props.drive} user={this.props.user} />
                <div className="render_flex">
                    <div className="render_div">
                        {drives && this.renderDrives(drives)}
                    </div>
                    <div className="render_img">
                        {drives && this.renderDrives2(drives)}
                    </div>
                </div>
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
