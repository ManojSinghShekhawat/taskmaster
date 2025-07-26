import { Box, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "../components/Column";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  updateTaskStatus,
  updateTaskStatusAsync,
} from "../redux/slices/taskSlice";

const statuses = ["Not Started", "In Progress", "Review", "Completed"];

function Kanban() {
  const { tasks } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const groupedTasks = {
    "Not Started": tasks.filter((task) => task.status === "Not Started"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Review: tasks.filter((task) => task.status === "Review"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(draggableId);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    console.log("Moved", draggableId, "to", destination.droppableId);
    dispatch(
      updateTaskStatus({
        taskId: draggableId,
        newStatus: destination.droppableId,
      })
    );
    dispatch(
      updateTaskStatusAsync({
        taskId: draggableId,
        newStatus: destination.droppableId,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SimpleGrid>
        <HStack align="start" spacing={4} p={4}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <Box key={status} flex={"1"}>
              <Column
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
              />
            </Box>
          ))}
        </HStack>
      </SimpleGrid>
    </DragDropContext>
  );
}

export default Kanban;
