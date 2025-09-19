import { VStack, HStack, Box } from "@chakra-ui/react"
import Header from "./Header"
import NavBar from "./NavBar"
import Main from "./Main"
import SideBar from "./SideBar"
import color from "../../constants/color"
import { useContext, useEffect } from "react"
import { authContext } from "../../context/AuthProvider"
import { slackContext } from "../../context/SlackProvider"

const Slack = () => {
    const { setThread, setThreadData } = useContext(slackContext)
    const { tokenVerify } = useContext(authContext)
    useEffect(() => {
        tokenVerify()
        setThread(false);
        setThreadData({
            parentId: '',
            user: {},
            messages: [],
        })
    }, [])
    return (
        <VStack w={"100vw"} h="100vh" bg={color.primary} gap={0}>
            <Header />
            <HStack w="full" h="full" flex={'1 1 0'}>
                <NavBar />
                <HStack w="full" h="full" flex={'1 1 0'} padding={"2px"}>
                    <SideBar />
                    <Box w="full" h="full" flex={'1 1 0'}>
                        <Main />
                    </Box>
                </HStack>
            </HStack>
        </VStack>
    )
}
export default Slack