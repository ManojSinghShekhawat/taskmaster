import { Box, Heading, VStack } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

const Column = ({ status, tasks }) => {
  return (
    <Box bg="gray.100" p={4} rounded="md" minH="500px" shadow="md">
      <Heading size={"md"} mb={4} textTransform={"capitalize"}>
        {status}
      </Heading>
      <Droppable droppableId={status}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            minH={"400px"}
          >
            <VStack>
              {tasks.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
              ))}
            </VStack>
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default Column;
