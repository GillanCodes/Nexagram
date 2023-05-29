import { FOLLOW_USER, GET_USER, UPDATE_USER } from "../actions/user.action";

const initialState:object = {};

export default function userReducer(state = initialState, action:any)
{
    switch(action.type)
    {
        case GET_USER:
            return action.payload
        case UPDATE_USER:
            return action.payload
        case FOLLOW_USER:
            return {
                ...state,
                follow: action.payload.userData.follow
            }
        default:
            return state;
    }
}