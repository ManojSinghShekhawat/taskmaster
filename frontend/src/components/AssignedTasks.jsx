import { Box, Grid, Text, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const columnTemplate = "1fr 2fr 2fr 1fr"; // Adjust column widths as needed
const headers = ["Task", "Project", , "Due Date", "Priority"];

const AssignedTasks = ({ myTasks }) => {
  return (
    <>
      <Heading fontSize="xl" mt={4}>
        Assigned Tasks
      </Heading>
      <Box w="100%" overflowX="auto">
        {/* Header Row */}
        <Grid
          templateColumns={columnTemplate}
          gap={4}
          bg="gray.100"
          p={2}
          fontWeight="bold"
        >
          {headers.map((h, i) => (
            <Text key={i}>{h}</Text>
          ))}
        </Grid>

        {/* Data Rows */}
        {myTasks.map((item, idx) => (
          <Grid
            key={item.task._id}
            templateColumns={columnTemplate}
            gap={4}
            borderBottom="1px solid #e2e8f0"
            p={2}
          >
            <Link to={`/tasks/${item.task._id}`}>{item.task.title}</Link>
            <Text>{item.project.title}</Text>

            <Text>{item.task.dueDate.split("T")[0]}</Text>

            <Text>{item.task.priority}</Text>
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default AssignedTasks;
