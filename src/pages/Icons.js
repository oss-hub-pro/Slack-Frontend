import { Wrap, Box, Text } from "@chakra-ui/react";
import * as Fa from "react-icons/fa"
const Icons = () => {
    return (
        <Wrap display={'flex'} alignItems={'center'} justify={'center'} >
            {Object.keys(Fa).map(index => {
                return (
                    <Box fontSize={'24px'} display={'flex'} m={'20px'} gap={4} w="450px">
                        <Box >{Fa[index]()}</Box>
                        <Text>{Fa[index].name}</Text>
                    </Box>
                )
            })}
        </Wrap>
    )
}
export default Icons