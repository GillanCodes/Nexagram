import { CREATE_POST, GET_ALL_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/posts.action";

const initialState:any = {};

export default function postsReducer(state = initialState, action:any)
{
    switch(action.type)
    {
        case GET_ALL_POSTS:
            return action.payload;
        case CREATE_POST:
            return [...state, action.payload];
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
        default:
            return state;
    }
}