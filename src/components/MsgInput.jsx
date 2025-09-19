import { Textarea, Input, Box, HStack, VStack } from "@chakra-ui/react"
import { useContext, useRef, useState } from "react"
import { FaUpload, FaRegSmile, FaPlus } from "react-icons/fa"
import FileList from "./FileList";
import { slackContext } from "../context/SlackProvider";
import { authContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const MsgInput = (props) => {
    const { auth } = useContext(authContext)
    const { current, createMessage, uploadFile } = useContext(slackContext)
    const [files, setFiles] = useState([]);
    const [msgText, setMsgText] = useState('');
    const fileRef = useRef();

    const chooseFile = (e) => {
        setFiles([...files, ...e.target.files])
    }
    const handleMessage = (e) => {
        setMsgText(e.target.value);
    }
    const sendMsg = () => {
        if (!current.receiver && !current.channel || !msgText && !files.length) {
            toast.warn('Info inforrect!');
            return;
        }
        let C_receivers;
        if (!current.isDM && current.channel) C_receivers = current.channel.members.map((info) => { return info._id })
        let receivers = current.isDM ? [auth._id, current.receiver._id] : C_receivers
        let data = {
            sender: auth._id,
            content: msgText,
            receivers: receivers,
            isDirect: current.isDM,
            channel: current.isDM ? '' : current.channel._id,
        }
        if (props.isThread) {
            data.isDraft = true;
            data.parent = props.parentId
        }
        if (files.length) {
            if (!files.length) return;
            let fileData = {
                sender: auth._id, receivers, files: files,
                channel: current.isDM ? '' : current.channel._id,
            }
            uploadFile(fileData);
        }
        else createMessage(data);
        setFiles([]);
        setMsgText('');
    }
    return (
        <VStack pos={props.pos} px={4} left={2} bottom={4} w="96%" p={2} gap={2} bg="#0002" rounded={6}>
            <Textarea name="textArea" bg={'#0002'} cursor={'wait'} value={msgText} row={4} placeholder="Message.." onChange={handleMessage}></Textarea>
            <Box w={'full'} display={'flex'} gap={4} px={2}>
                <FileList setFiles={setFiles} files={files} />
            </Box>
            <HStack w="full" px={"12px"} fontSize={20} justify={"space-between"}>
                <HStack gap={2}>
                    <Box onClick={() => fileRef.current.click()}><FaUpload /></Box>
                    <Box><FaRegSmile /></Box>
                    <Box><FaPlus /></Box>
                    <Input ref={fileRef} type="file" multiple hidden onChange={chooseFile} />
                </HStack>
                <Box display={'flex'} rounded={4} px={2} bg={'rgba(82, 181, 65, 1)'} _hover={{ cursor: 'pointer' }} onClick={sendMsg}>Send</Box>
            </HStack>
        </VStack>
    )
}
export default MsgInput;