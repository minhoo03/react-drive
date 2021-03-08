import {
    CLEAR_USER,
    SET_USER,
    SET_PHOTO_URL
} from '../actions/types'

const initalUserState = {
    currentUser: null,
    isLoading: true
}

export default function(state = initalUserState, action) {
    switch(action.type) {
        case SET_USER:
            return { 
                ...state,
                currentUser: action.payload,
                isLoading: false
            }

        case CLEAR_USER:
            return { 
                ...state,
                currentUser: null,
                isLoading: false
            }

        case SET_PHOTO_URL:
            return {
                ...state,
                currentUser: {...state.currentUser, photoURL: action.payload},
                isLoading: false
            }    

        default:
            return state
    }
}