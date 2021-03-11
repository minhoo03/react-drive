import React, { Component } from 'react'
import { connect } from 'react-redux'
import UploadForm from './UploadForm'


export class MainPanel extends Component {

    render() {
        return (
            <div style={{
                padding:'8px',
                margin:'0 8px'
            }}>
                <UploadForm drive={this.props.drive} user={this.props.user} />
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
