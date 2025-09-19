import { Box, Flex, Text, Textarea } from "@chakra-ui/react";
import AvatarWithStatus from "./AvatarWithStatus";
import { useContext, useEffect, useState } from "react";
import { slackContext } from "../context/SlackProvider";
import MsgActions from "./MsgActions";
import Emoticon from "./Emoticon";
import { authContext } from "../context/AuthProvider";
import FileList from "./FileList";
import { toast } from "react-toastify";

export default (props) => {
    let msg = props.msg;
    const [sender, setSender] = useState({})
    const [files, setFiles] = useState([]);
    const { auth } = useContext(authContext)
    const [editMsg, setEditMsg] = useState(msg.content)
    const [edit, setEdit] = useState(false)
    const { message, allUsers, sendEmoticon, deleteMessage, updateMessage, current, setCurrent, setThreadData, thread, setThread } = useContext(slackContext)

    useEffect(() => {
        allUsers.forEach((user) => {
            if (user._id === msg.sender) {
                setSender(user);
                return;
            }
        });
        if (msg.files?.length) setFiles(msg.files);
    }, [])

    const getTime = (info) => {
        let time = new Date(info).toLocaleTimeString();
        let day = new Date(info).toLocaleDateString();
        let curDay = new Date().toLocaleDateString();
        if (day === curDay) return 'Today ' + time;
        else return day + ' ' + time;
    }

    const removeEmoticon = (id) => {
        if (msg.sender == auth._id)
            sendEmoticon({ _id: msg._id, icon: id, del: true })
    }
    const handlethread = (info) => {
        let data = {
            parentId: msg._id,
            user: {},
            messages: []
        }
        allUsers.forEach((user) => {
            if (user._id === info.sender) data.user = user
        })
        message.map((msgInfo) => {
            if (msgInfo.isDraft && msgInfo.parent === msg._id) data.messages.push(msgInfo);
        })
        setThreadData(data);
        setThread(true);
        setCurrent({ ...current, curMsgId: msg._id })
    }

    const deleteMsg = (id) => {
        deleteMessage(id);
    }
    const setPin = (_id) => {
        updateMessage({ _id, pins: auth._id })
    }
    const handleReplies = () => {
        if (thread) setThread(false);
        else handlethread(msg)
    }
    const updateMsg = (e) => {
        if(e.key == 'Enter') {
            toast.success(e.target.value);
            updateMessage({_id:msg._id, pins:'', content:editMsg})
            setEdit(false)
            return;
        }
    }

    return <Box id='msgTag' {...props} display={'flex'} pos={'relative'} p={4} gap={4} py={'10px'} border={'1px solid'} rounded={10} >
        < AvatarWithStatus w={'40px'} h={'40px'} {...sender} />
        <Box display={'flex'} flexDirection={'column'}>
            <Flex alignItems={'center'} gap={10}>
                <Text fontSize={'20px'} color={'blue'}>{sender.username}</Text>
                <Text>{getTime(msg.sendTime)}</Text>
            </Flex>
            <Text>{
                props.flag ? 'Files' : msg.content
            }
            {edit && <Textarea value={editMsg} onKeyDown={updateMsg} onChange={(e) => setEditMsg(e.target.value)}/>}
            </Text>
            {!props.isThread && <Text color='blue' cursor={'pointer'} onClick={(e) => handleReplies(e)}>Replies</Text>}
            <Flex>{
                msg.emoticons.length > 0 && msg.emoticons.map((emoticon) => {
                    if (emoticon.cnt > 0) {
                        return <Emoticon
                            key={emoticon.id}
                            id={emoticon.id}
                            cnt={emoticon.cnt}
                            cursor='pointer'
                            onClick={() => removeEmoticon(emoticon.id)}
                        />
                    }
                })
            }</Flex>
            <FileList setFiles={setFiles} files={files} />
        </Box>
        <MsgActions id={msg._id} isThread={props.isThread} flag={msg.sender == auth._id} pin={msg.pins.includes(auth._id) ? true : false} setPin={() => setPin(msg._id)} thread={handleReplies} edit={()=>setEdit(!edit)} delete={() => deleteMsg(msg._id)} />
    </Box>
}