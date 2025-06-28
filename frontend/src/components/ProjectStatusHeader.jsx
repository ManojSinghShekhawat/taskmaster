import { Box, Button, Heading, HStack, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const ProjectStatusHeader = ({ handleClick, title, id }) => {
  return (
    <>
      <Box borderBottom={"0.2px solid gray"}>
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={"xl"}>{title}</Heading>
          <RouterLink to={`/projects/${id.id}/newtask`}>
            <Button fontSize={"sm"}>New Task</Button>
          </RouterLink>
        </HStack>

        <Text fontSize={"md"} mb={3}>
          Kanban Board
        </Text>
        <Link
          fontSize={"sm"}
          fontWeight={"500"}
          onClick={() => handleClick("todo")}
        >
          Todo
        </Link>
        <Link
          fontSize={"sm"}
          mx={2}
          fontWeight={"500"}
          onClick={() => handleClick("inprogress")}
        >
          Inprogress
        </Link>
        <Link
          fontSize={"sm"}
          fontWeight={"500"}
          onClick={() => handleClick("review")}
        >
          Review
        </Link>
        <Link
          fontSize={"sm"}
          mx={2}
          fontWeight={"500"}
          onClick={() => handleClick("done")}
        >
          Done
        </Link>
      </Box>
    </>
  );
};

export default ProjectStatusHeader;
