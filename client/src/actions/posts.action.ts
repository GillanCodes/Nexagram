import axios from "axios";

export const GET_ALL_POSTS:string   = "GET_ALL_POSTS";
export const CREATE_POST:string     = "CREATE_POST";
export const LIKE_POST:string       = "LIKE_POST";
export const UNLIKE_POST:string     = "UNLIKE_POST";

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
            dispatch({type:CREATE_POST, payload: res.data});
        }).catch((err) => {
            console.log("NON", err);
        })
    }
}

export const likePost = (id:string) => {
    return(dispatch:any) => {
        return axios({
            method: "PATCH",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/post/${id}/like`
        }).then((res) => {
            dispatch({type: LIKE_POST, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    }
}

export const unlikePost = (id:string) => {
    return(dispatch:any) => {
        return axios({
            method: "PATCH",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/post/${id}/unlike`
        }).then((res) => {
            dispatch({type: UNLIKE_POST, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    }
}