import { Box, Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import AvatarWithStatus from "../../../components/AvatarWithStatus";
import color from "../../../constants/color";
import { slackContext } from "../../../context/SlackProvider";
import { toast } from "react-toastify";
import { authContext } from "../../../context/AuthProvider";
import { FaStaylinked } from "react-icons/fa";

const Channel = () => {
    const { auth } = useContext(authContext)
    const { modal, setModal, allUsers, createChannel, updateChannel } = useContext(slackContext)
    const [info, setInfo] = useState({
        name: "",
        creater: '',
        members: [],
        keyword: ""
    })
    useEffect(() => {
        if (modal.type === "Edit") {
            const temp = modal?.info?.members?.map(v => v._id);
            setInfo({ ...info, creater: modal.info.creater, name: modal.info.name, members: temp, keyword: "" })
        }
    }, [modal])
    const handleInfo = e => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    const handleMember = (id) => {
        let temp = info.members;
        if (temp.indexOf(id) >= 0) {
            temp = temp.filter(v => v !== id);
        } else temp.push(id)
        setInfo({ ...info, members: temp })
    }
    const removeModal = () => {
        setModal({ ...modal, status: false, type: "", info: {} })
        setInfo({
            name: "", members: [], keyword: ""
        })
    }
    const submitHandler = () => {
        let temp = { ...info }
        if (temp.name === '') {
            toast.warn('Channel Name Error!');
            return;
        }
        delete info.keyword;
        if (modal.type === "Add") {
            createChannel(temp);
        } else if (modal.type === "Edit") {
            updateChannel({ ...temp, _id: modal.info._id })
        }
        removeModal();
    }
    return (
        <Flex w="100vw" h="100vh" pos={"fixed"} top={0} right={0} justify={"space-around"} align={"center"} display={modal.status && (modal.type != "Invite") ? "flex" : "none"}>
            <Box w="100vw" h="100vh" onClick={removeModal} />
            <VStack pos={'absolute'} padding={"30px"} color={color.third} rounded={"12px"} w={"320px"} bg={color.secondary} gap={"15px"}>
                <Text fontSize={"24px"} display={'flex'} alignItems={'center'} gap={4}><FaStaylinked/>{modal.type} Channel</Text>
                <Input h="40px" value={info.name} name="name" onChange={handleInfo} />
                <Input h="40px" placeholder="search user..." value={info.keyword} name="keyword" onChange={handleInfo} />
                <Box w="full" border={"solid 1px white"} rounded={"8px"} p={2} overflowY={"auto"} h="200px">
                    {allUsers.filter(v => v.username.indexOf(info.keyword) >= 0 || v.email.indexOf(info.keyword) >= 0).map(v => {
                        if (auth._id != v._id)
                            return <HStack w="full" rounded={4} gap={"8px"} key={v._id} pos="relative" h="32px" padding={"4px 8px"} onClick={() => handleMember(v._id)} _hover={{ bg: '#fff4', color: "#000" }} cursor={"pointer"}>
                                <AvatarWithStatus {...v} /><Text>{`${v.username}`}</Text>
                                <Flex pos="absolute" right={0} fontSize={"12px"} paddingInline={"4px"}>
                                    <input name="checkbox" type="checkbox" checked={info.members.indexOf(v._id) >= 0 ? true:false} onChange={()=>{}}/>
                                </Flex>
                            </HStack>
                    })}
                </Box>
                <HStack w="full" justify={"space-around"}>
                    <Button maxW="120px" w="full" bg={"blue"} onClick={submitHandler}>OK</Button>
                    <Button maxW="120px" w="full" bg={"blue"} onClick={removeModal}>Cancel</Button>
                </HStack>
            </VStack>
        </Flex>
    )
}
export default Channel