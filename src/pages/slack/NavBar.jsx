import { VStack, Text, Box } from "@chakra-ui/react"
import { FaHome, FaGamepad, FaRocketchat, } from "react-icons/fa"

import AvatarWithStatus from "../../components/AvatarWithStatus"
import { useContext, useEffect, useState } from "react"
import { authContext } from "../../context/AuthProvider"
import { slackContext } from "../../context/SlackProvider"
import UserModal from "../../components/UserModal"
const NavBar = () => {
    const { auth } = useContext(authContext)
    const [showModal, setShowModal] = useState(false)
    return (
        <VStack h="calc(100vh - 40px)" w="70px" pos={'relative'} color={"white"} px={'10px'} py={"24px"} justify={"space-between"}>
            <VStack gap={4} >
                <VStack id='nv' cursor={"pointer"}>
                    <Box id={'ico'} p={2} fontSize={'28px'} rounded={6}><FaHome /></Box>
                    <Text >Home</Text>
                </VStack>
                <VStack id='nv' cursor={"pointer"}>
                    <Box id={'ico'} p={2} fontSize={'28px'} rounded={6}><FaRocketchat /></Box>
                    <Text >DMs</Text>
                </VStack>
                <VStack id='nv' cursor={"pointer"}>
                    <Box id='ico' p={2} fontSize={'28px'} rounded={6}><FaGamepad /></Box>
                    <Text >Games</Text>
                </VStack>
            </VStack>
            <AvatarWithStatus visibleStatus={true} w="40px" h="40px" {...auth} onClick={()=>setShowModal(!showModal)} />
            {
                showModal && <UserModal cancel={() => setShowModal(!showModal)} />
            }
        </VStack>

    )
}
export default NavBar