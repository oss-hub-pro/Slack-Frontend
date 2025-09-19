import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { emoticons } from "../constants/emoticons";

const Emoticon = ({ id, ...props }) => {
    const icon = useMemo(() => emoticons.find((emoticon) => emoticon.id == id)?.icon, [id])

    return (
        <Box {...props} display={'flex'} pos={'relative'} w={'30px'} h={'30px'} alignItems={'center'} justifyContent={'center'} px={4}>
            {icon}
            {props.cnt > 1 &&
                <Box color={'red'} pos={'absolute'} top={'-8px'} right={0} >{props.cnt}</Box>
            }
        </Box>
    )
}

export default Emoticon;
