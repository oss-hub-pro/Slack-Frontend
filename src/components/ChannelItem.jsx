import { Flex, HStack, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { FaEdit, FaRegTrashAlt } from "react-icons/fa"
import color from "../constants/color"
import { slackContext } from "../context/SlackProvider"
import { authContext } from "../context/AuthProvider"

const ChannelItem = (props) => {
    const { auth } = useContext(authContext);
    const { setModal, deleteChannel, current, setCurrent } = useContext(slackContext)
    const editChannelHandler = () => {
        setModal({ status: true, type: "Edit", info: { ...props } });
    }
    const deleteChannelHandler = () => {
         deleteChannel({id:props._id, isDM:false}) 
    }
    const chooseChannel = () => {
        setCurrent({...current, isDM:false, channel:props})
    }
    return (
        <HStack pos="relative" gap={2} onClick={chooseChannel} bg={props.selected ? "white" : "inherit"} color={props.selected ? color.primary : "interit"} w="full" cursor={"pointer"} px={4} py={1} rounded={"8px"} _hover={{ bg: "#fff9", color: color.primary }}>
            <Text>#</Text>
            <Text>{props.name.slice(0, 20)}</Text>
            {
                props.creater == auth._id &&
                <HStack h="full" pos={"absolute"} right={"4px"} top={0} gap={1}>
                    <Flex fontSize={'14px'} w="full" h="full" align={"center"} _hover={{ transform: "scale(1.2)", color: "#000" }} onClick={editChannelHandler}>
                        <FaEdit />
                    </Flex>
                    <Flex fontSize={"14px"} w="full" h="full" align={"center"} _hover={{ transform: "scale(1.2)", color: "#000" }} onClick={deleteChannelHandler}>
                        <FaRegTrashAlt />
                    </Flex>
                </HStack>
            }
        </HStack>
    )
}
export default ChannelItem