import { VStack, Text, Box } from "@chakra-ui/react"
import { useContext } from "react"
import { slackContext } from "../../context/SlackProvider"
import { useEffect } from "react"
import MsgInput from "../../components/MsgInput"
import MessageTag from "../../components/MessageTag"
const Thread = () => {
    const { setThread, threadData, setThreadData, current, message} = useContext(slackContext)
    useEffect(() => {
        let tmp = [];
        message.map((msgInfo) => {
            if (msgInfo.isDraft && msgInfo.parent === current.curMsgId) tmp.push(msgInfo);
        })
        setThreadData({ ...threadData, messages: tmp });
    }, [message])
    return (
        <VStack w="40%" h="full" gap={6} pos={'relative'} rounded={"0 8px 8px 0"} py={10} px={4} borderLeft={'1px #0004 solid'}>
            <Box pos={'absolute'} fontSize={'30px'} cursor={'pointer'} top={0} right={2} onClick={() => setThread(false)}>&times;</Box>
            <Text textAlign={'center'} fontSize={'24px'} >Thread</Text>
            <VStack w={'full'} h={'76%'} overflowY={'auto'} gap={4}>
                {
                    threadData.messages?.map((msg, key) => {
                        return <MessageTag w={'full'} key={key} msg={msg} isThread={'true'} />
                    })
                }
            </VStack>
            <MsgInput parentId={threadData.parentId} pos={'absolute'} isThread={'true'} />
        </VStack>
    )
}
export default Thread