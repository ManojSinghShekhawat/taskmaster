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
  Heading,
  Box,
  InputGroup,
  InputRightElement,
  Avatar,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, use } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useSelector } from "react-redux";

import { MentionsInput, Mention } from "react-mentions";
import mentionStyle from "../layouts/mentionStyle";

export const Comments = ({
  isOpen,
  onOpen,
  onClose,
  taskTitle,
  taskId,
  projectTitle,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users.users);
  const userList = users.map((user) => ({
    id: String(user._id),
    display: String(user.name),
  }));

  const handleCommentSubmit = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/comments/new", {
        comment,
        task: taskId,
      });

      setComments((prevComments) => [...prevComments, response.data.comment]);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/comments/task/${taskId}`);
        setComments(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent maxW={"80%"}>
          <Box w={"90%"} margin={"auto"}>
            <ModalHeader>
              <Heading> {taskTitle}</Heading>
              <Text>{projectTitle}</Text>
            </ModalHeader>
            <ModalHeader>Comments</ModalHeader>

            <ModalCloseButton />
            <ModalBody pb={6}>
              {comments.map((comment) => (
                <HStack key={comment._id}>
                  <Avatar
                    name={comment?.user.name ? comment?.user.name : user.name}
                    src="https://bit.ly/dan-abramov"
                  />
                  <VStack spacing={0} alignItems={"flex-start"}>
                    <Text fontWeight={"bold"}>
                      {" "}
                      {comment?.user.name ? comment?.user.name : user.name}
                    </Text>
                    <Text>{comment.comment}</Text>
                  </VStack>
                </HStack>
              ))}

              <HStack mt={3} alignItems="flex-start">
                <Avatar
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                  mt={1}
                />
                <Box flex="1" position="relative">
                  {Array.isArray(userList) && userList.length > 0 ? (
                    <Box position="relative">
                      <MentionsInput
                        style={{
                          ...mentionStyle,
                          control: {
                            ...mentionStyle.control,
                            paddingRight: "4.5rem", // make space for the button
                          },
                        }}
                        value={comment}
                        onChange={(event, newValue) => {
                          setComment(newValue);
                        }}
                        placeholder="Add a comment"
                      >
                        <Mention
                          trigger="@"
                          data={userList}
                          markup="@__display__"
                          displayTransform={(id, display) => `@${display}`}
                        />
                      </MentionsInput>

                      <Button
                        size="sm"
                        colorScheme="blue"
                        borderRadius="full"
                        position="absolute"
                        top="4px"
                        right="4px"
                        zIndex="1"
                        onClick={handleCommentSubmit}
                      >
                        Save
                      </Button>
                    </Box>
                  ) : (
                    <InputGroup>
                      <Input
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.5rem"
                          size="sm"
                          colorScheme="blue"
                          borderRadius="full"
                          onClick={handleCommentSubmit}
                        >
                          Save
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  )}
                </Box>
              </HStack>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
