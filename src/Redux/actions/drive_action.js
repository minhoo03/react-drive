import {
    SET_CURRENT_DRIVE_ROOM
} from './types'

export function setCurrentDriveRoom(currentDriveRoom) {
    return {
        type: SET_CURRENT_DRIVE_ROOM,
        payload: currentDriveRoom
    }
}