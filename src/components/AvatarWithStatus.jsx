import { Flex, Text, Box, Image } from "@chakra-ui/react"
import { FaMoon } from "react-icons/fa"
import color from "../constants/color"
const AvatarWithStatus = (props) => {
    const path = `${process.env.REACT_APP_BASE_URL}/avatar/${props.avatar}`
    const w = props.w ? props.w : "24px"
    const h = props.h ? props.h : '24px'
    return (
        <Flex maxW={w} h={h} minW={w} minH={h} pos="relative" onClick={props.onClick}>
            <Image src={path} w="full" rounded={"20%"} h="full" />
            {props.visibleStatus && (
                props.status == 3 ? <Box w="30%" h="30%" rounded="50%" bg={"white"} pos={"absolute"} border={"solid 1px white"} outline={`solid 2px ${color.primary}`} bottom="0" right={"0"}><FaMoon style={{ color: "black", width: "100%", height: "100%" }} /></Box> :
                    <Box w="30%" h="30%" rounded="50%" bg={props.status == 1 ? "green" : (props.status == 2 ? "yellow" : 'red')} pos={"absolute"} border={"solid 1px white"} outline={`solid 2px ${color.primary}`} bottom="0" right={"0"}></Box>
            )}
        </Flex>
    )
}
export default AvatarWithStatus