import { FaComments, FaFileArchive } from "react-icons/fa"
import { Text, VStack, HStack } from "@chakra-ui/react"
import { AiFillPushpin } from "react-icons/ai"
import { slackContext } from "../../context/SlackProvider";
import { useContext } from "react";
import ChannelModal from "../slack/modal/Channel"
import MessagePage from "./mainPages/MessagePage";
import InviteModal from "../slack/modal/Invite"
import FilePage from "./mainPages/FilePage";
import MsgInput from "../../components/MsgInput";
import PinPage from "./mainPages/PinPage";
import Thread from "./Thread"
import color from "../../constants/color";

const Main = () => {

    const { thread } = useContext(slackContext)
    const curChannel = {
        name: "my channel",
    }
    const { current, setCurrent } = useContext(slackContext)
    const handleTab = (tab) => {
        setCurrent({ ...current, tab: tab })
    }
    return (
        <HStack w="full" h="full" bg={"white"} rounded={"0 8px 8px 0"}>
            <VStack flexGrow={1} flexShrink={1} flexBasis={0} h="full" w="full" pb={'20px'}>
                <VStack w="full" padding="12px 12px 0 12px">
                    <Text fontSize={{ base: "16px", lg: "18px" }} padding={"4px 0px 4px 0"} w="full" fontWeight={"extrabold"}>#{curChannel.name}</Text>
                    <HStack gap={0} w="full">
                        <HStack gap={2} cursor="pointer" padding="8px" borderBottom={current.tab == "msg" ? `solid 2px ${color.secondary}` : "none"} onClick={() => handleTab("msg")}>
                            <FaComments />
                            <Text fontSize={{ base: "12px", md: "12px", lg: "14px" }}>Message</Text>
                        </HStack>
                        <HStack gap={2} cursor="pointer" padding="8px" borderBottom={current.tab == "file" ? `solid 2px ${color.secondary}` : "none"} onClick={() => handleTab("file")}>
                            <FaFileArchive />
                            <Text fontSize={{ base: "12px", md: "12px", lg: "14px" }}>Files</Text>
                        </HStack>
                        <HStack gap={2} cursor="pointer" padding="8px" borderBottom={current.tab == "pin" ? `solid 2px ${color.secondary}` : "none"} onClick={() => handleTab("pin")}>
                            <AiFillPushpin />
                            <Text fontSize={{ base: "12px", md: "12px", lg: "14px" }}>Pin</Text>
                        </HStack>
                    </HStack>
                </VStack>
                <VStack flex={'1 1 0'} w="full" h="full" overflowY={'auto'} p={4}>
                    {current.tab == 'msg' && <MessagePage />}
                    {current.tab == 'file' && <FilePage />}
                    {current.tab == 'pin' && <PinPage />}
                </VStack>
                <MsgInput p={4} />
            </VStack>
            {thread && <Thread />}
            <ChannelModal />
            <InviteModal />
        </HStack>
    )
}
export default Main;