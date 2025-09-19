import { Box } from "@chakra-ui/react";
import { emoticons } from "../constants/emoticons";
import Emoticon from "./Emoticon";
import { toast } from "react-toastify";
import { useContext } from "react";
import { slackContext } from "../context/SlackProvider";

const Emoticons = (props) => {
    const { sendEmoticon } = useContext(slackContext)
    const onClick = (id) => {
        sendEmoticon({ _id: props.id, icon: id, del:false });
    }
    return (
        <Box w={'210px'} py={"20px"} zIndex={10} flexWrap={'wrap'} onMouseLeave={props.cancel} bg={'#fff'} border={"1px solid"} p={2} backdropFilter={'blur(4px)'} rounded={10} display={'flex'} pos={'absolute'} top={'24px'} left={'-80px'} >
            {emoticons.map((emoticon, key) => (
                <Emoticon
                    key={key}
                    id={emoticon.id}
                    cursor='pointer'
                    onClick={() => {props.cancel();onClick(emoticon.id)}}
                />
            ))}
        </Box>
    )
}

export default Emoticons;
