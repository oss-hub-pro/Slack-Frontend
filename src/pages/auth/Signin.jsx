import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import PasswordInput from "../../components/PasswordInput"
import { authContext } from "../../context/AuthProvider"
import toast from "../../utils/toast"
import validate from "../../utils/validator"
import color from "../../constants/color"

const Signin = () => {
    const [info, setInfo] = useState({
        email: "",
        password: ""
    })

    const { login } = useContext(authContext);
    const changeInfo = e => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    const handleLogin = async () => {
        if (!validate(info.email, "email") || !validate(info.password, "password")) {
            toast.warning("Please check up your input... Something went wrong")
        } else {
            await login(info)
        }
    }
    return (
        <Flex w="100vw" h="100vh" justify={"space-around"} align={"center"} bg={color.primary} color={"white"}>
            <VStack w={'330px'} bg={color.secondary} rounded={'10px'} gap={10} px={10} py={8}>
                <Text fontSize={40}>~ Sign In ~</Text>
                <Input type={"email"} name={"email"} placeholder={"Alex@gmail.com"} onChange={changeInfo} />
                <PasswordInput minW="240px" maxW="320px" w="full" placeholder={"password"} value={info.password} onChange={changeInfo} name="password" setValue={changeInfo} />
                <Button w={"full"} color={'#000'} onClick={handleLogin}>SignIn</Button>
                <Link to={'/signup'}>Do you have already Account?</Link>
            </VStack>
        </Flex>
    )
}
export default Signin