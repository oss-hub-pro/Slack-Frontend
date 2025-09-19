import { HStack, Text, VStack, Box, Title } from "@chakra-ui/react"
import { FaWeebly, FaCaretDown, FaCaretRight, FaPlusSquare } from "react-icons/fa"
import { useContext, useEffect, useState } from "react"
import color from "../../constants/color"
import ChannelItem from "../../components/ChannelItem"
import DMItem from "../../components/DMItem"
import { slackContext } from "../../context/SlackProvider"
import { authContext } from "../../context/AuthProvider"
const SideBar = () => {
    const [opts, setOpts] = useState({
        CM: true,
        DM: true,
    })
    const { auth } = useContext(authContext)
    const { updateUser, modal, setModal, CM, DM, message, thread, setThread } = useContext(slackContext)
    const addChannel = () => {
        setModal({ ...modal, status: true, type: "Add" })
    }
    const invitePeople = () => {
        setModal({ ...modal, status: true, type: "Invite" })
    };

    useEffect(() => { updateUser({ _id: auth._id, status: 1 }); }, [])

    return (
        <VStack overflowY={"auto"} color={color.third} bg={color.secondary} fontSize={{ base: "14px", lg: "16px" }} w={{ base: "220px", md: "220px", lg: "300px" }} h="calc(100vh - 44px)" rounded={"12px 0 0 12px"} padding={"18px 12px 12px 12px"} gap={"12px"}>
            <VStack w="full" gap={1} >
                <HStack w="full" cursor={"pointer"} onClick={() => setOpts({ ...opts, CM: !opts.CM })} gap={"4px"}>
                    {opts.CM ? <FaCaretDown /> : <FaCaretRight />}<Text fontSize={24}>Channels</Text>
                </HStack>
                {opts.CM && CM.map((v, i) => (<ChannelItem {...v} key={i} />))}
                <HStack w="full" h={'36px'} gap={2} cursor={"pointer"} fontSize={18} p={2} rounded={8} onClick={addChannel} _hover={{ bg: "white", color: color.primary }}>
                    <FaPlusSquare /><Text >Add Channel</Text>
                </HStack>
            </VStack>
            <VStack w="full" gap={1}>
                <HStack w="full" cursor={"pointer"} onClick={() => setOpts({ ...opts, DM: !opts.DM })} gap={"4px"}>
                    {opts.DM ? <FaCaretDown /> : <FaCaretRight />}<Text fontSize={24}>Direct Peoples</Text>
                </HStack>
                {opts.DM && DM.map((v, i) => (<DMItem member={v.member} _id={v._id} key={i} />))}

                <HStack w="full" h={'36px'} gap={2} cursor={"pointer"} fontSize={18} p={2} rounded={8} onClick={invitePeople} _hover={{ bg: "white", color: color.primary }}>
                    <FaPlusSquare /><Text >Invite People</Text>
                </HStack>

            </VStack>
        </VStack >
    )
}
export default SideBar