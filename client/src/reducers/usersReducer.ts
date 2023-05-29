import { FOLLOW_USER, UPDATE_USER } from "../actions/user.action";
import { GET_USERS } from "../actions/users.action";
import { IAction } from "../interfaces/action.interfaces";
import { IUser } from "../interfaces/user.interface";

const initialState:any = {};

export default function usersReducer(state = initialState, action:any)
{
    switch(action.type)
    {
        case GET_USERS:
            return action.payload
        case UPDATE_USER:
            return state.map((user:IUser) => {
                if (user._id === action.payload._id)
                {
                    return action.payload
                }
                else 
                {
                    return user
                }
            })
        case FOLLOW_USER:
            return state.map((user:IUser) => {
                if(user._id === action.payload.usersData._id)
                {
                    console.log(action.payload);
                    return action.payload.usersData;
                }
                else
                {
                    return user;
                }
            });
        default:
            return state;
    }
}