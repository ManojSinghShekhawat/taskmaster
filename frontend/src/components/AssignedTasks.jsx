import { Box, Grid, Text, Heading } from "@chakra-ui/react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
const columnTemplate = "2fr 2fr 2fr 2fr 1fr"; // Adjust column widths as needed
const headers = ["Task", "Project", "Status", "Due Date", "Priority"];

const AssignedTasks = ({ myTasks }) => {
  const filteredTasks = myTasks.filter((task) => task.status !== "Completed");
  return (
    <>
      {filteredTasks.length > 0 ? (
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
            {filteredTasks.map((item, idx) => (
              <Grid
                key={item._id}
                templateColumns={columnTemplate}
                gap={4}
                borderBottom="1px solid #e2e8f0"
                p={2}
              >
                <Link to={`/tasks/${item._id}`}>{item.title}</Link>
                <Text>{item?.project?.title}</Text>

                <Text>{item.status}</Text>

                <Text>{item.dueDate.split("T")[0]}</Text>

                <Text>{item.priority}</Text>
              </Grid>
            ))}
          </Box>
        </>
      ) : (
        <Text>No assigned tasks</Text>
      )}
    </>
  );
};

export default AssignedTasks;
