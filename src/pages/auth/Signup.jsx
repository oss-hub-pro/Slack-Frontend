import { Button, Flex, HStack, Input, Img, VStack, Box } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { authContext } from "../../context/AuthProvider";
import toast from "../../utils/toast";
import validate from "../../utils/validator";
import color from "../../constants/color";

const Signup = () => {
    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirm: "",
        avatar: {},
        path: ''
    });
    const imgRef = useRef();
    const { register } = useContext(authContext);

    const changeInfo = e => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        let path = URL.createObjectURL(e.target.files[0]);
        setInfo({ ...info, avatar: e.target.files[0], path });
    };

    const SignUp = async () => {
        if (info.password !== info.confirm) {
            toast.warning("Please check your password");
        } else if (!validate(info.username) || !validate(info.email, "email") || !validate(info.password, "password")) {
            toast.warning("Please check your input... Something went wrong");
        } else {
            let temp = { ...info };
            delete temp.confirm;
            try {
                await register(temp);
            } catch (error) {
                toast.error("Registration failed. Please try again.");
            }
        }
    }

    return (
        <Flex w="100vw" h="100vh" justify={"space-around"} align={"center"} bg={color.primary} color={"white"}>
            <VStack w={'330px'} bg={color.secondary} rounded={'10px'} gap={6} px={10} py={8}>
                <Img w={'100px'} h={'100px'} cursor={'poinger'} rounded={10} onClick={() => imgRef.current.click()} src={info.path ? info.path : `${process.env.REACT_APP_BASE_URL}/avatar/default.jpg`} />
                <Input type="file" hidden onChange={handleFileChange} ref={imgRef} />
                <Input type={"text"} name={"username"} value={info.username} placeholder={"Alex"} onChange={changeInfo} />
                <Input type={"email"} name={"email"} value={info.email} placeholder={"Alex@gmail.com"} onChange={changeInfo} />
                <PasswordInput w="full" placeholder={"Password"} value={info.password} onChange={changeInfo} name="password" />
                <PasswordInput w="full" placeholder={"Confirm"} value={info.confirm} onChange={changeInfo} name="confirm" />
                <Button color={'#000'} w={"full"} onClick={SignUp}>Sign Up</Button>
                <Link to={'/'}>Don't you have an account?</Link>
            </VStack>
        </Flex>
    );
};

export default Signup;