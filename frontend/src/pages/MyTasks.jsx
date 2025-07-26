import { Box, Grid, Text, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const columnTemplate = "1fr 1fr 1fr 1fr 1fr";
const headers = ["Task", "Project", "Status", "Due Date", "Priority"];

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/tasks/mytasks");
        setTasks(res.data.tasksWithProjects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <Box w={"80%"} m="auto" mt={4}>
        <Box display={"flex"} alignItems={"flex-end"}>
          <Heading fontSize="3xl">My Tasks</Heading>
          <Button variant={"link"} size={"sm"} ml={4}>
            <Link to="/kanban"> Kanban Board </Link>
          </Button>
        </Box>

        <Text my={4}>View and manage your tasks</Text>
        <Box
          w="100%"
          overflowX="auto"
          border={"1px solid gray"}
          borderRadius={"md"}
        >
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
          {tasks.map((item, idx) => (
            <Grid
              key={idx}
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
      </Box>
    </>
  );
};

export default MyTasks;
