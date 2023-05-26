import axios from "axios";

export const GET_ALL_POSTS  = "GET_ALL_POSTS";
export const CREATE_POST    = "CREATE_POST";

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

export const createPost = (data:any) => {
    return(dispatch:any) => {
        return axios({
            method: "POST",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/post/`,
            data
        }).then((res) => {
            console.log("OUI", res.data);
            dispatch({type:CREATE_POST, payload: res.data});
        }).catch((err) => {
            console.log("NON", err);
        })
    }
}