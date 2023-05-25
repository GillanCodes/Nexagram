import { GET_USERS } from "../actions/users.action";
import { IAction } from "./reducer.interfaces";

const initialState:object = {};

export default function usersReducer(state = initialState, action:IAction)
{
    switch(action.type)
    {
        case GET_USERS:
            return action.payload
        default:
            return state;
    }
}