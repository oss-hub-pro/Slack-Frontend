import { HStack, Text, Flex } from "@chakra-ui/react"
import color from "../constants/color"
import AvatarWithStatus from "../components/AvatarWithStatus"
import { FaRegTrashAlt } from "react-icons/fa"
import { useContext } from "react"
import { slackContext } from "../context/SlackProvider"
import { authContext } from "../context/AuthProvider"

const ChannelItem = (props) => {
    const {auth} = useContext(authContext)
    const { deleteChannel, current, setCurrent} = useContext(slackContext)
    const deleteDMUser = () => {
        deleteChannel(props._id)
    }
    const chooseDM = ()=> {
        setCurrent({...current, receiver:props.member, isDM:true})
    }
    return (
        <HStack pos={'relative'} id="msgTag" gap={2} onClick={chooseDM} bg={props.selected ? "white" : "inherit"} color={props.selected ? color.primary : "interit"} w="full" cursor={"pointer"} px={2} py={1} rounded={"8px"} _hover={{ bg: '#fff9', color: color.primary }}>
            <AvatarWithStatus visibleStatus={true} {...props.member} />
            <Text fontSize={'18px'}>{props.member.username}</Text>
            {
                props.member._id != auth._id &&
            <HStack h="full" display={'none'} id="msgTools" color={'black'} pos={"absolute"} right={"4px"} top={0} gap={1}>
                <Flex fontSize={"14px"} w="full" h="full" align={"center"} _hover={{ transform: "scale(1.2)", color: "#000" }} onClick={deleteDMUser}>
                    <FaRegTrashAlt />
                </Flex>
            </HStack>
            }
        </HStack >
    )
}
export default ChannelItem