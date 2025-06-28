import React from "react";
import { Text, VStack } from "@chakra-ui/react";

const TaskCountBox = ({ heading, count }) => {
  return (
    <VStack border={"1px solid gray"} p={2} w={"90%"} borderRadius={"md"}>
      <Text>{heading}</Text>
      <Text fontWeight={"bold"}>{count}</Text>
    </VStack>
  );
};

export default TaskCountBox;
