import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProjectTodoTasks = ({ tasksWithProjects, projectId }) => {
  const task = tasksWithProjects.filter(
    (obj) => obj.task.status === "Not Started" && obj.task.project === projectId
  );

  return (
    <>
      {task.map((task) => {
        return (
          <Box mt={4} key={task.task._id}>
            <Text>{task.task.priority} Priority todo</Text>
            <Link to={`/tasks/${task.task._id}`}>
              {" "}
              <Heading>{task.task.title}</Heading>
            </Link>
            <Text>{task.task.description}</Text>
          </Box>
        );
      })}
    </>
  );
};

export default ProjectTodoTasks;
