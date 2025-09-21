import { Flex } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { slackContext } from "../../../context/SlackProvider"
import { authContext } from "../../../context/AuthProvider"
import MessageTag from "../../../components/MessageTag"
import FileList from "../../../components/FileList"

export default (props) => {
    const { auth } = useContext(authContext);
    const { current, fileList, getFiles } = useContext(slackContext);

    const isDM = (file) => {
        let str = JSON.stringify(file.receivers);
        if (file.channel.length) return false;
        if (str.includes(auth._id) && file.sender == current.receiver._id) return true;
        return false;
    }
    const isCM = (file) => {
        if(file.channel != current.channel._id) return false
        return true;
    }
    useEffect(() => {
        getFiles();
    }, [])

    return (
        <Flex flexDirection={'column'} w={'full'} h={'full'} gap={4} >
            {
                fileList?.map((files, key) => {
                    if (current.isDM) if (isDM(files)) {
                        return <FileList key={key} flag={'filetag'} files={files.files} />
                    }
                })
            }{
                fileList?.map((files, key) => {
                    if (!current.isDM) if (isCM(files)) {
                        return <FileList key={key} flag={'filetag'} files={files.files} />
                    }
                })
            }
        </Flex>
    )
}