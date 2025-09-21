import { Box, Flex, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { slackContext } from "../context/SlackProvider";
import { Link } from "react-router-dom";
import AvatarWithStatus from "./AvatarWithStatus";

export default (props) => {
    const { downloadFile } = useContext(slackContext)
    let files = props.files;
    const delFile = (del) => {
        let tmp = files.filter(file => file != del);
        props.setFiles(tmp);
    }
    useEffect(()=>{
        console.log(downloadFile)
    },[])
    return (
        <Flex w={'full'} gap={4} px={2} flexWrap={'wrap'}>
            {
                files.length != 0 && files.map((file, key) => {
                    return <Box  bg={'#ffff'} gap={4} px={1} key={key} p={props.flag && 2} display={'flex'} justifyContent={'space-between'} alignItems={'center'} border={'1px solid #00ffd0ff'} rounded={4}>

                        <Flex alignItems={'center'} gap={4}>
                            <Text>{props.flag ? file.originalname : file.name}</Text>
                            {props.flag && <a href={`${process.env.REACT_APP_BASE_URL}/download/${file.filename}/${file.originalname}`} ><FaDownload cursor={'pointer'} onClick={() => downloadFile(file)} /> </a>
                            }
                            {!props.flag && <Box fontSize={22} onClick={() => delFile(file)} _hover={{ cursor: 'pointer' }} >&times;</Box>}
                        </Flex>
                    </Box>
                })
            }
        </Flex>
    )
}