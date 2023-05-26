import { CREATE_POST, GET_ALL_POSTS } from "../actions/posts.action";
import { IAction } from "../interfaces/action.interfaces";

const initialState:any = {};

export default function postsReducer(state = initialState, action:IAction)
{
    switch(action.type)
    {
        case GET_ALL_POSTS:
            return action.payload;
        case CREATE_POST:
            return [...state, action.payload];
        default:
            return state;
    }
}