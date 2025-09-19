import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authContext } from "./AuthProvider";
import actions from "../constants/slackSocketActions"
import io from "socket.io-client"
import axios from "axios";
export const slackContext = createContext();

const SlackProvider = (props) => {
    const { auth, setAuth } = useContext(authContext)
    const [allUsers, setAllUsers] = useState([]);
    const [thread, setThread] = useState(false);
    const [threadData, setThreadData] = useState({
        parentId: '',
        user: {},
        messages: [],
    });
    const [current, setCurrent] = useState({
        curMsgId: '',
        receiver: '',
        isDM: false,
        channel: '',
        tab: "msg"
    });
    const [CM, setCM] = useState([])
    const [DM, setDM] = useState([])
    const [modal, setModal] = useState({
        status: false,
        type: "",
        info: {}
    })
    const [message, setMessage] = useState([]);
    const [fileList, setFileList] = useState([]);

    const socket = useMemo(() => auth._id && io(process.env.REACT_APP_BASE_URL, { extraHeaders: { token: localStorage.getItem("token") } }), [auth._id]);

    useEffect(() => {
        getAllUsers();
        getChannels();
        getMessages();
        socketAuth(localStorage.getItem("token"));
    }, [auth])

    useEffect(() => {
        if (socket) {
            socket.on(actions.GET_ALL_USERS, data => {
                setAllUsers([...data]);
            })
            socket.on(actions.CREATE_CHANNEL, () => {
                getChannels();
            })
            socket.on(actions.GET_CHANNELS, data => {
                let CM = [];
                let DM = [];
                data.forEach(v => {
                    if (v.creater == null) {
                        if (v.members[0]._id === auth._id) DM.push({ _id: v._id, member: v.members[1] })
                        else DM.push({ _id: v._id, member: v.members[0] })
                    }
                    else CM.push(v)
                })
                setDM(DM)
                setCM(CM)
            })

            socket.on(actions.GET_MESSAGES, data => {
                setMessage(data.messages)
            })
            socket.on(actions.CREATE_MESSAGE, data => {
                setMessage([...message, data])
            })
            socket.on(actions.UPDATE_MESSAGE, data => {
                console.log('Update_Messages => ', data)
            })

            socket.on(actions.EMOTICON, data => {
                getMessages();
            })
            socket.on(actions.STATUS, data => {
                getChannels();
            })
            socket.on(actions.FILES, (data) => {
                setFileList(data);
            })
        }
        return () => {
            socket && socket.removeListener(actions.GET_ALL_USERS);
            socket && socket.removeListener(actions.CREATE_CHANNEL);
            socket && socket.removeListener(actions.GET_CHANNELS);
            socket && socket.removeListener(actions.UPDATE_CHANNEL);

            socket && socket.removeListener(actions.GET_MESSAGES);
            socket && socket.removeListener(actions.CREATE_MESSAGE);
            socket && socket.removeListener(actions.DELETE_MESSAGE);
            socket && socket.removeListener(actions.UPDATE_MESSAGE);

            socket && socket.removeListener(actions.EMOTICON);
            socket && socket.removeListener(actions.STATUS);
            socket && socket.removeListener(actions.FILES);
        }
    })

    const socketAuth = (data) => {
        socket && socket.emit(actions.AUTH, data)
    }
    const updateUser = (data) => {
        socket && socket.emit(actions.UPDATE, data)
    }
    const createChannel = (data, isDM) => {
        socket.emit(actions.CREATE_CHANNEL, { name: data.name ? data.name : null, creater: isDM ? null : auth._id, members: [...data.members, auth._id] });
    }
    const updateChannel = (data) => {
        socket.emit(actions.UPDATE_CHANNEL, data);
    }
    const deleteChannel = (data) => {
        socket.emit(actions.DELETE_CHANNEL, data);
    }

    const getChannels = () => {
        socket && socket.emit(actions.GET_CHANNELS, auth._id);
    }
    const getAllUsers = () => {
        socket && socket.emit(actions.GET_ALL_USERS)
    }

    const getMessages = () => {
        socket && socket.emit(actions.GET_MESSAGES)
    }
    const createMessage = (data) => {
        socket && socket.emit(actions.CREATE_MESSAGE, data)
    }
    const updateMessage = (data) => {
        socket && socket.emit(actions.UPDATE_MESSAGE, data)
    }
    const deleteMessage = (data) => {
        socket && socket.emit(actions.DELETE_MESSAGE, data)
    }

    const getFiles = () => {
        socket && socket.emit(actions.FILES)
    }
    const uploadFile = async (data) => {
        let files = new FormData();
        files.append('sender', data.sender);
        files.append('receivers', data.receivers);
        files.append('channel', data.channel);
        data.files.map(file => files.append('files', file));
        await axios({
            url: `${process.env.REACT_APP_BASE_URL}/file/upload`,
            method: 'POST',
            data: files
        }).then(({ data }) => {
            if (data == 'err') console.log('Select File!');
        }).catch(() => {
            console.log('File Upload Filed')
        })
        socket.emit(actions.FILES)
    }

    const sendEmoticon = (data) => {
        socket && socket.emit(actions.EMOTICON, data);
    }
    const value = {
        CM, DM,
        getFiles,
        sendEmoticon,
        modal, setModal,
        thread, setThread,
        current, setCurrent,
        message, setMessage,
        allUsers, setAllUsers,
        fileList, setFileList,
        socketAuth, updateUser,
        uploadFile,
        threadData, setThreadData,
        getAllUsers, createChannel, updateChannel, deleteChannel,
        getMessages, createMessage, updateMessage, deleteMessage,

    }

    return (
        <slackContext.Provider value={value}>
            {props.children}
        </slackContext.Provider>
    )
}
export default SlackProvider