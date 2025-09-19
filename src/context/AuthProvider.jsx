import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi, verifyApi } from "../api/auth";
import toast from "../utils/toast";

export const authContext = createContext();

const AuthProvider = (props) => {

    const navigate = useNavigate()
    const [auth, setAuth] = useState({
        _id: "",
        username: "",
        email: "",
        status: 4,
        token: ""
    })
    const register = async (data) => {
        try {
            const result = await registerApi(data);
            toast[result.data.status](result.data.message);
            if (result.status === 201) {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const login = async (data) => {
        try {
            const result = await loginApi(data);
            if (result.data.status !== 'success') {
                toast[result.data.status](result.data.message);
                return;
            }
            setAuth({ ...result.data.user, token: result.data.token });
            localStorage.setItem("token", result.data.token);
            toast[result.data.status](result.data.message);
            navigate('/slack/msg')
        } catch (err) {
            console.log(err);
        }
    }
    const logout = () => {
        setAuth({});
        localStorage.removeItem("token")
        navigate("/")
    }
    const tokenVerify = async () => {
        try {
            await verifyApi().then(({data}) => {
                const user = data.user;
                setAuth({ ...user })
            }).catch(err => {
                navigate('/')
            });
        } catch (err) {
            logout();
        }
    }

    useEffect(() => {
        (async () => await tokenVerify())()
    }, [auth.token])

    return (
        <authContext.Provider value={{ auth, setAuth, register, login, logout, tokenVerify}}>
            {props.children}
        </authContext.Provider>
    )
}
export default AuthProvider