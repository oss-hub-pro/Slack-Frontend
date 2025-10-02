import { Flex, Box, Text } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { slackContext } from "../../../context/SlackProvider"
import { authContext } from "../../../context/AuthProvider"
import FileList from "../../../components/FileList"
import AvatarWithStatus from "../../../components/AvatarWithStatus"

export default (props) => {
    const { auth } = useContext(authContext);
    const { current, fileList, allUsers, getFiles } = useContext(slackContext);

    const isDM = (file) => {
        let str = JSON.stringify(file.receivers);
        if (file.channel.length) return false;
        if (str.includes(auth._id) && file.sender == current.receiver._id) return true;
        return false;
    }
    const isCM = (file) => {
        if (file.channel != current.channel._id) return false
        return true;
    }
    useEffect(() => {
        getFiles();
    }, [])
    function findbyId(id) {
        let data = {};
        allUsers.forEach((user) => {
            if (user._id == id) {
                data = user;
            }
        })
        return data;
    }
    return (
        <Flex flexDirection={'column'} w={'full'} h={'full'} gap={4} >
            {
                fileList?.map((files, key) => {
                    if (current.isDM) if (isDM(files)) {
                        let data = findbyId(files.sender);
                        return <Box display={'flex'} key={key} gap={2}>
                            < AvatarWithStatus w={'40px'} h={'40px'} {...data} />
                            <Flex flexDirection={'column'} px={2} gap={4}>
                                <Text fontSize={'20px'} color={'blue'}>{data.username}</Text>
                                <FileList flag={'filetag'} files={files.files} />
                            </Flex>
                        </Box>
                    }
                })
            }{
                fileList?.map((files, key) => {
                    if (!current.isDM) if (isCM(files)) {
                        let data = findbyId(files.sender);
                        return <Box display={'flex'} key={key} gap={2}>
                            < AvatarWithStatus w={'40px'} h={'40px'} {...data} />
                            <Flex flexDirection={'column'} px={2} gap={4}>
                                <Text fontSize={'20px'} color={'blue'}>{data.username}</Text>
                                <FileList flag={'filetag'} files={files.files} />
                            </Flex>
                        </Box>
                    }
                })
            }
        </Flex>
    )
}