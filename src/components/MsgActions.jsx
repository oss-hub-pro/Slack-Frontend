import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { FaRocketchat, FaEdit, FaRegSmile, FaTrashAlt, FaThumbtack } from "react-icons/fa"
import Emoticons from "./Emoticons"
import { AiFillPushpin, } from "react-icons/ai"
export default (props) => {
    const [show, setShow] = useState(false)

    return (
        <Flex id='msgTools' display={'none'} gap={2} pos={'absolute'} fontSize={'20px'} top={2} right={24} >

            <Box onClick={props.setPin}>
                {
                    props.pin ?
                        <FaThumbtack /> :
                        <AiFillPushpin />
                }
            </Box>
            <Box onClick={() => setShow(true)}>
                <FaRegSmile />
            </Box>
            {!props.isThread && <FaRocketchat onClick={props.thread} />}
            <FaEdit onClick={props.edit} />
            {props.flag && <FaTrashAlt onClick={props.delete} />}
            {show && <Emoticons id={props.id} cancel={() => setShow(false)} />}
        </Flex>
    )
}