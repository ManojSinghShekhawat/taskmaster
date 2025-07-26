import { Box, Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Comments } from "./Comments";

const ProjectTask = ({ tasksWithProjects, projectId, status }) => {
  const task = tasksWithProjects.filter(
    (obj) => obj.status === status && obj.project._id === projectId
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {task.map((task) => {
        return (
          <Box mt={4} key={task._id}>
            <Text>{task.priority} Priority todo</Text>
            <Link to={`/tasks/${task._id}`}>
              <Heading size={"md"}>{task.title}</Heading>
            </Link>
            <Text>{task.description}</Text>
            <Button
              w={"8rem"}
              h={"2rem"}
              borderRadius={"2rem"}
              mt={2}
              onClick={onOpen}
            >
              View Comment
            </Button>
            <Comments
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              taskTitle={task.title}
              projectTitle={task.project.title}
              taskId={task._id}
            />
          </Box>
        );
      })}
    </>
  );
};

export default ProjectTask;
