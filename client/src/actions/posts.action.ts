import axios from "axios";

export const GET_ALL_POSTS = "GET_ALL_POSTS";

export const getAllPosts = () => {
    return(dispatch:any) => {
        return axios({
            method: "GET",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/post/all`
        }).then((res) => {
            console.log(res.data);
            dispatch({type:GET_ALL_POSTS, payload: res.data});
        }).catch((err) => {
            console.log(err);
        })
    }
}