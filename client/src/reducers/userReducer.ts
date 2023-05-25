import { GET_USER } from "../actions/user.action";
import { IAction } from "../interfaces/action.interfaces";

const initialState:object = {};

export default function userReducer(state = initialState, action:IAction)
{
    switch(action.type)
    {
        case GET_USER:
            return action.payload
        default:
            return state;
    }
}