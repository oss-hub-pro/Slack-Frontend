import { Box, Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import AvatarWithStatus from "../../../components/AvatarWithStatus";
import color from "../../../constants/color";
import { slackContext } from "../../../context/SlackProvider";
import { authContext } from "../../../context/AuthProvider";
import { FaAddressBook } from "react-icons/fa";

const Channel = () => {
    const { auth } = useContext(authContext)
    const { modal, setModal, allUsers, createChannel, DM } = useContext(slackContext)
    const [info, setInfo] = useState({
        name: "",
        members: [],
        keyword: ""
    });

    const handleInfo = e => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    const handleMember = (v) => {
        setInfo({ ...info, name: `${v.username} ( ${v.email} )`, members: [v._id] })
    }
    const removeModal = () => {
        setModal({ ...modal, status: false, type: "" })
        setInfo({
            name: "", members: [], keyword: ""
        })
    }
    const createChannelHandler = () => {
        let temp = { ...info }
        delete temp.keyword;
        delete temp.name;
        createChannel(temp, true);
        removeModal();
    }
    return (
        <Flex w="100vw" h="100vh" pos={"fixed"} top={0} right={0} justify={"space-around"} align={"center"} display={modal.status && (modal.type == "Invite") ? "flex" : "none"}>
            <Box w="100vw" h="100vh" onClick={removeModal} />
            <VStack padding={"30px"} pos={'absolute'} color={color.third} rounded={"12px"} w={"320px"} bg={color.secondary} gap={6}>
                <Text fontSize={"24px"} display={'flex'} alignItems={'center'} gap={4}><FaAddressBook/>{modal.type} People</Text>
                <Input h="40px" placeholder="search user..." value={info.keyword} name="keyword" onChange={handleInfo} />
                <Box w="full" border={"solid 1px white"} rounded={"8px"} p={2} overflowY={"auto"} h="240px">
                    {allUsers.filter(v => v.username.indexOf(info.keyword) >= 0 || v.email.indexOf(info.keyword) >= 0).map(v => {
                        if (auth._id != v._id && JSON.stringify(DM).indexOf(v._id) == -1)
                            return <HStack w="full" gap={"8px"} rounded={4} key={v._id} pos="relative" h="32px" padding={"4px 8px"} onClick={() => handleMember(v)} _hover={{ bg: '#fff4', color: "#000" }} cursor={"pointer"}>
                                <AvatarWithStatus {...v} /><Text>{`${v.username}`}</Text>
                                <Flex pos="absolute" right={0} w="fit-content" fontSize={"12px"} paddingInline={"4px"} rounded={4}>
                                    <input type={'radio'} name="radio" checked={info.members[0] == v._id} onChange={()=>{}}/>
                                </Flex>
                            </HStack>
                    })}
                </Box>
                <HStack w="full" justify={"space-around"}>
                    <Button maxW="120px" w="full" bg={'#6d226dff'} _hover={{bg:'#c579c5ff', color:'#000'}} onClick={createChannelHandler}>OK</Button>
                    <Button maxW="120px" w="full" bg={'#9f7ba0ff'} _hover={{bg:'#d4cbd4ff', color:'#000'}}  onClick={removeModal}>Cancel</Button>
                </HStack>
            </VStack>
        </Flex>
    )
}
export default Channel