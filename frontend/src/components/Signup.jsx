import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const Signup = ({ isRegisterOpen, onRegisterClose, onLoginOpen }) => {
  const toast = useToast();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setSignupData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

  const handleSignup = async () => {
    try {
      const res = await axiosInstance.post("/api/v1/users/new", signupData);
      onRegisterClose();
      console.log(res.data);
      if (res.status === 201) {
        toast({
          title: "Signup Successfull",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up for TaskMaster</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="John Doe"
              onChange={handleChange}
              name="name"
              value={signupData.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="abc@mail.com"
              onChange={handleChange}
              name="email"
              value={signupData.email}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="your password"
              onChange={handleChange}
              name="password"
              value={signupData.password}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder="your password"
              onChange={handleChange}
              name="confirmPassword"
              value={signupData.confirmPassword}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter flexDirection={"column"} gap={2}>
          <Button
            colorScheme="blue"
            mr={3}
            width={"100%"}
            onClick={handleSignup}
          >
            Signup
          </Button>
          <Text>
            Already have an account?{" "}
            <Link
              onClick={() => {
                onLoginOpen();
                onRegisterClose();
              }}
            >
              Log in
            </Link>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Signup;
