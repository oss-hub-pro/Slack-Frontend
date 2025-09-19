import axios from "axios";
export const registerApi = async (data) => {
    let formdata = new FormData();
    formdata.append('username', data.username)
    formdata.append('email', data.email)
    formdata.append('password', data.password)
    formdata.append('avatar', data.avatar)
    return await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, formdata);
}
export const loginApi = async (data) => {
    return await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, data);
}
export const verifyApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/verify`);
}
export const sendFile = async (data) => {
    
}