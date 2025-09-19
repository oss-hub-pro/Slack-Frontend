import { Box, Flex, Text } from "@chakra-ui/react"
import { useContext, useEffect, useMemo, useState } from "react"
import { slackContext } from "../../../context/SlackProvider"
import { authContext } from "../../../context/AuthProvider"
import MessageTag from "../../../components/MessageTag"

export default () => {
    const { auth } = useContext(authContext);
    const { current, message } = useContext(slackContext);

    const isDM = (msg) => {
        if (!msg.isDirect) return false;
        if (msg.receivers.includes(auth._id) && msg.receivers.includes(current.receiver._id)) return true;
        return false;
    }
    const isCM = (msg) => {
        let str = JSON.stringify(msg);
        if (msg.channel != current.channel._id) return false;
        if (!str.includes(auth._id)) return false;
        return true;
    }

    return (
        <Flex flexDirection={'column'} w={'full'} h={'full'} gap={4} >
            {
                 message?.map((msg, key) => {
                    if (msg.pins.includes(auth._id) && current.isDM) if (isDM(msg))
                        return <MessageTag key={key} msg={msg} />
                })
            }{
                message?.map((msg, key) => {
                    if (msg.pins.includes(auth._id) &&  !current.isDM) if (isCM(msg))
                        return <MessageTag key={key} msg={msg} />
                })
            }
        </Flex> 
    )
}