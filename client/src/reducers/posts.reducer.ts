import { COMMENT_POST, CREATE_POST, DELETE_COMMENT, DELETE_POST, GET_ALL_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/posts.action";

const initialState:any = {};

export default function postsReducer(state = initialState, action:any)
{
    switch(action.type)
    {
        case GET_ALL_POSTS:
            return action.payload;
        case CREATE_POST:
            return [...state, action.payload];
        case DELETE_POST:
            return state.filter((post:any) => post._id !== action.payload.id);
        case LIKE_POST :
            return state.map((post:any) => {
                if (post._id === action.payload._id){
                    return action.payload;
                } else return post
            });
        case UNLIKE_POST:
            return state.map((post:any) => {
                if (post._id === action.payload._id)
                {
                    return action.payload;
                } else return post;
            });
        case COMMENT_POST:
            return state.map((post:any) => {
                if(post._id === action.payload._id)
                    return action.payload
                else return post
            });
        case DELETE_COMMENT:
            return state.map((post:any) => {
                if (post._id === action.payload._id){
                    return action.payload;
                } else return post
            });
        default:
            return state;
    }
}