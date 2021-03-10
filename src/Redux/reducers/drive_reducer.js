import {
    SET_CURRENT_DRIVE_ROOM
} from '../actions/types'

const initalDriveRoomState = {
    currentDriveRoom: {name:''}
}

export default function(state = initalDriveRoomState, action) {
    switch(action.type) {
        case SET_CURRENT_DRIVE_ROOM: {
            return {
                ...state,
                currentDriveRoom: action.payload
            }
        }

        default:
            return state
    }
}