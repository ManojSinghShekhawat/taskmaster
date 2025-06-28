import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import Signup from "./Signup";

const LandingPage = () => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <>
      <Box bg={bg} minH="100vh" px={6} py={12}>
        <HStack spacing={10} justify="center" flexWrap="wrap">
          <VStack align="start" spacing={6} maxW="lg">
            <Heading size="2xl">Manage Your Tasks Effortlessly</Heading>
            <Text fontSize="lg" color="gray.600">
              Boost your productivity with our intuitive task management tool.
              Create, assign, track, and complete tasks seamlessly.
            </Text>
            <HStack spacing={4}>
              <Button
                colorScheme="teal"
                size="lg"
                onClick={() => onLoginOpen()}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </HStack>
          </VStack>

          <Image
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Task Illustration"
            boxSize={{ base: "250px", md: "350px" }}
            objectFit="contain"
          />
        </HStack>
      </Box>
      <Login
        isLoginOpen={isLoginOpen}
        onLoginClose={onLoginClose}
        onRegisterOpen={onRegisterOpen}
      />
      <Signup
        isRegisterOpen={isRegisterOpen}
        onRegisterClose={onRegisterClose}
        isLoginOpen={onLoginOpen}
      />
    </>
  );
};

export default LandingPage;
