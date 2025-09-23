import { Text, VStack } from "@chakra-ui/react"
import { useContext } from "react"
import { slackContext } from "../context/SlackProvider"
import color from "../constants/color"

export default (props) => {
    const setUserName = (name) => {
        let tmp = props.message + name + ' ';
        props.setMsgText(tmp);
        props.setModal(false)
    }
    const { allUsers } = useContext(slackContext)
    return (
        <VStack maxW={'160px'} maxH={'160px'} top={'-170px'} left={'10px'} zIndex={20} p={4} overflowY={'auto'} rounded={10} bg={color.primary} pos={'absolute'}>
            {
                allUsers.map((user, key) => {
                    return <Text key={key} w={'full'} color={'white'} cursor={'pointer'} px={2} py={1} _hover={{ bg: '#fff3' }} onClick={() => setUserName(user.username)} rounded={8}>{user.username}</Text>
                })
            }
        </VStack>
    )
}