
import { Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const PasswordInput = ({ value, setValue, placeholder, ...props }) => {
    const [visible, setVisible] = useState(false);
    const handleOption = () => {
        setVisible(!visible)
    }
    return (<Flex pos="relative" {...props}>
        <Input {...props} type={visible ? "text" : "password"} value={value} onChange={setValue} placeholder={placeholder} />
        <Flex pos="absolute" right={"0"} w={"40px"} justify={"space-around"} align={"center"} h="full" onClick={handleOption} zIndex="9" cursor={" pointer"}>
            {visible ? <FaRegEye /> : <FaRegEyeSlash />}
        </Flex>
    </Flex >)
}
export default PasswordInput;