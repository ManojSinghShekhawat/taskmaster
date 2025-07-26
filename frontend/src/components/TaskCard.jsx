import { Badge, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          p={4}
          bg="white"
          border="1px solid #E2E8F0"
          borderRadius="md"
          shadow="sm"
          _hover={{ shadow: "md", cursor: "pointer" }}
          width={"100%"}
        >
          <Text fontSize={"lg"} fontWeight={"bold"} mb={2}>
            {task.title}
          </Text>
          <Text fontSize={"sm"} mb={2}>
            {task.description?.slice(0, 100)}...
          </Text>
          <Badge colorScheme={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </Box>
      )}
    </Draggable>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "red";
    case "medium":
      return "yellow";
    case "low":
      return "green";
    default:
      return "gray";
  }
};

export default TaskCard;
