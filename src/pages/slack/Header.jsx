import { Box, Flex, Input, HStack } from "@chakra-ui/react"
import { FaSearch, FaArrowRight, FaArrowLeft } from "react-icons/fa"
import color from "../../constants/color";

const Header = () => {
    return (
        <HStack w="full" h="40px" justify={"center"}>
            <HStack color={color.third} gap={"12px"}>
                <Box _hover={{ color: "blue" }} cursor={"pointer"}><FaArrowLeft /></Box>
                <Box _hover={{ color: "blue" }} cursor={"pointer"}><FaArrowRight /></Box>
                <Box w={{ base: "220px", sm: "260px", md: "600px" }} pos="relative">
                    <Input name="search" w="full" h="30px" border={`solid 1px ${color.secondary}`} />
                    <Flex pos="absolute" top={0} right={0} w="32px" h="full" justify={"space-around"} align={"center"}>
                        <FaSearch />
                    </Flex>
                </Box>
            </HStack>
        </HStack>
    )
}
export default Header;