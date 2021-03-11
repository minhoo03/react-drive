import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import { setCurrentDriveRoom } from '../../../Redux/actions/drive_action'

import { AiOutlineSmile } from 'react-icons/ai'
import { HiShare } from 'react-icons/hi'
import { IoMdPeople } from 'react-icons/io'
import { FaPlus } from 'react-icons/fa'

import { Button, Modal, Form } from 'react-bootstrap'

export class DriveRooms extends Component {


    state = { 
        show: false,
        name: '',
        DriveRoomsRef: firebase.database().ref('DriveRooms'),
        myDriveRoomRef: firebase.database().ref('myDriveRoom'),
        DriveRooms: [],
        firstLoad: true,
        activeDriveRoomId: ''
    }


    componentDidMount() {
        this.addDriveRoomsListeners()
    }

    
    componentWillMount() {
        this.state.DriveRoomsRef.off()
    }

    // DB의 DriveRoom을 state로
    addDriveRoomsListeners = () => {
        let DriveRoomsArray = []

        this.state.DriveRoomsRef.on("child_added", DataSnapshot => {
            DriveRoomsArray.push(DataSnapshot.val())

            this.setState({DriveRooms: DriveRoomsArray}, () => {
                this.setfirstDriveRoom()
            })
        })
    }


    setfirstDriveRoom = () => {
        const { user } = this.props
            // const firstDriveRoom = this.state.DriveRooms[0]

            const firstDriveRoom = {
                id: user.uid,
                name: '내'
            }

            if(this.state.firstLoad && this.state.DriveRooms.length > 0) {
                this.props.dispatch(setCurrentDriveRoom(firstDriveRoom))
                this.setState({activeDriveRoomId: firstDriveRoom.id})
            }    
        // 새로고침을 하지 않는 이상 firstDriveRoom이 반복되지 않는다.
        this.setState({firstLoad: false})
    }


    handleClose = () => this.setState({show: false})
    handleShow = () => this.setState({show: true})


    handleSubmit = (e) => {
        e.preventDefault()

        const { name } = this.state

        if (this.isFormValid(name)) {
            this.addDriveRoom()
        }
    }


    isFormValid = (name) => {
        return name
    }


    addDriveRoom = async () => {

        const key = this.state.DriveRoomsRef.push().key
        const { name } = this.state

        // Created Obj
        const newDriveRoom = {
            id: key,
            name
        }

        // Send DB
        try {
            await this.state.DriveRoomsRef.child(key).update(newDriveRoom)

            this.setState({
                name: '',
                show: false
            })

        } catch (error) {
            alert(error)
        }
    }

    // state의 DriveRoom을 map
    renderDriveRooms = (DriveRooms) => {
        return DriveRooms.length > 0 &&
        DriveRooms.map(room => {
            return <li key={room.id} onClick={() => this.changeDriveRoom(room)} style={{backgroundColor: room.id == this.state.activeDriveRoomId && '#ffffff45'}}><IoMdPeople /> {room.name} 드라이브</li>
        })
    }


    changeDriveRoom = (room) => {
        this.props.dispatch(setCurrentDriveRoom(room))
        this.setState({activeDriveRoomId: room.id})
    }


    render() {

        return (
            <div style={{
                padding:'0 16px',
                margin: '0 8px'
            }}>
                <div style={{
                    position:'relative', width:'100%',
                    display:'flex', alignItems:'center'
                }}>

                <HiShare style={{marginRight: 3}} />
                    공유 드라이브 ({this.state.DriveRooms.length})
                    <FaPlus style={{
                        position: 'absolute',
                        right: 0, cursor: 'pointer'
                    }}
                    onClick={this.handleShow}
                    />
                </div>


                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {this.renderDriveRooms(this.state.DriveRooms)}
                </ul>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a drive room</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter a drive room name"
                                    onChange={ (e) => this.setState({name: e.target.value})}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>

                        <Button variant="primary" onClick={this.handleSubmit}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
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
export default connect(mapToStateProps)(DriveRooms)
