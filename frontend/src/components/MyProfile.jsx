import { useSelector } from "react-redux";
import {
  Box,
  Heading,
  Avatar,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import profilePic from "../assets/profilepic.jpg";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  const handleUpdatePassword = async () => {
    try {
      const res = await axiosInstance.put(
        `/api/v1/users/${user._id}`,
        profileData
      );
      console.log(res.data);
      if (res.status === 200) {
        toast({
          title: "Password updated successfully. Please login again",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m={"auto"} width={"70%"} mt={4}>
      <Heading mb={4}>My Profile</Heading>
      <HStack>
        <Avatar name={user.name} src={profilePic} size={"lg"} />
        <VStack ml={1} alignItems={"flex-start"}>
          <Text> {user.name}</Text>
          <Text mt={-2}> {user.email}</Text>
        </VStack>
      </HStack>
      <Heading mt={4} size={"md"}>
        Account
      </Heading>
      <Box w={"50%"}>
        <FormControl>
          <FormLabel>Current Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your current password"
            value={profileData.oldPassword}
            onChange={(e) =>
              setProfileData({ ...profileData, oldPassword: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your new password"
            value={profileData.password}
            onChange={(e) =>
              setProfileData({ ...profileData, password: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm your new password"
            value={profileData.confirmPassword}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                confirmPassword: e.target.value,
              })
            }
          />
        </FormControl>
        <Button
          mt={4}
          borderRadius={"xl"}
          colorScheme={"blue"}
          onClick={handleUpdatePassword}
        >
          Update Password
        </Button>
      </Box>
    </Box>
  );
};

export default MyProfile;
