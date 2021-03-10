import React, { Component } from 'react'
import { connect } from 'react-redux'

export class MainPanel extends Component {
    render() {

        const { drive } = this.props

        return (
            <div>
                {drive.name}
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
