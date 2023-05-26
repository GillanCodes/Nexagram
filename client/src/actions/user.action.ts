import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getUser = (UId:string) => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/user/${UId}`,
            withCredentials:true
        }).then((res) => {
            dispatch({type: GET_USER, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const updateUser = (data:any) => {
    return (dispatch:any) => {
        return axios({
            method:"PATCH",
            url: `${process.env.REACT_APP_API_URL}/user/${data._id}`,
            withCredentials:true,
            data: {
                bio: data.bio,
                fullname: data.fullname
            }
        }).then((res) => {
            dispatch({type:UPDATE_USER, payload: res.data});
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const updateAvatar = (data:object, id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"PATCH",
            url: `${process.env.REACT_APP_API_URL}/user/${id}/avatar`,
            withCredentials:true,
            data
        }).then((res) => {
            dispatch({type:UPDATE_USER, payload: res.data});
        }).catch((err) => {
            console.log(err);
        })
    }
}