import { Box, VStack, Button } from "@chakra-ui/react"
import color from "../constants/color"
import { useContext, useEffect } from "react"
import { authContext } from "../context/AuthProvider"
import { slackContext } from "../context/SlackProvider"


export default (props) => {
    const { auth, setAuth, logout } = useContext(authContext)
    const { updateUser } = useContext(slackContext)
    const handlesleep = () => {
        setAuth({...auth, status:2})
        updateUser({ _id: auth._id, status: 2 });
        props.cancel();
    }
    const handleactive = () => {
        setAuth({...auth, status:1})
        updateUser({ _id: auth._id, status: 1 });
        props.cancel();
    }
    const handlelogout = () => {
        setAuth({...auth, status:4})
        updateUser({ _id: auth._id, status: 4});
        logout();
    }
    return (
        <Box pos={'absolute'} bottom={4} left={20} bg={color.primary} p={2} w={'120px'} h='160px' rounded={10} display={'flex'} flexDirection={'column'} alignContent={'center'} justifyContent={'space-around'} >
            <Button w={'full'} onClick={handleactive} justifyContent={'space-between'} bg={color.secondary} _hover={{ color: '#000', bg: '#fff' }}>Active<Box w={'16px'} h={'16px'} border={'1px solid'} rounded={'50%'} bg={'green'} /></Button>
            <Button w={'full'} onClick={handlesleep} justifyContent={'space-between'} bg={color.secondary} _hover={{ color: '#000', bg: '#fff' }}>Sleep<Box w={'16px'} h={'16px'} border={'1px solid'} rounded={'50%'} bg={'yellow'} /></Button>
            <Button w={'full'} onClick={handlelogout} justifyContent={'space-between'} bg={color.secondary} _hover={{ color: '#000', bg: '#fff' }}>Logout<Box w={'16px'} h={'16px'} border={'1px solid'} rounded={'50%'} bg={'red'} /></Button>
        </Box >
    )
}