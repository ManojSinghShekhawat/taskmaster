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
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ isLoginOpen, onLoginClose, onRegisterOpen }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/api/v1/users/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      onLoginClose();
      dispatch(loginSuccess(res.data.user));
      navigate("/home");
      if (res.status === 200) {
        toast({
          title: "Login Successfull",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in to your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="abc@mail.com"
              onChange={handleChange}
              name="email"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="******"
              value={loginData.password}
              onChange={handleChange}
              name="password"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter flexDirection={"column"} gap={2}>
          <Button
            colorScheme="blue"
            mr={3}
            width={"100%"}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Text>
            Don't have an account?{" "}
            <Link
              onClick={() => {
                onRegisterOpen();
                onLoginClose();
              }}
            >
              Sign up
            </Link>
          </Text>

          <Link>Forgot Password ?</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
