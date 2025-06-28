import {
  Box,
  Grid,
  Text,
  Heading,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NewProject from "../components/newProject";

import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const columnTemplate = "2fr 2fr"; // Adjust column widths as needed

const headers = ["Project Name", "Description"];

const data = [
  {
    ProjectName: "Task Manager",
    Description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima rerum eos reiciendis atque ab placeat veritatis obcaecati nemo, eveniet quasi delectus dolor! Assumenda necessitatibus fugit sapiente consectetur aspernatur exercitationem laudantium?",
  },
];

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/v1/projects/myprojects/created "
        );
        setProjects(res.data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Box w="70%" m="auto">
      <HStack justifyContent={"space-between"}>
        <Heading fontSize="3xl" my={4}>
          Projects
        </Heading>

        <Button fontSize={"sm"} onClick={onOpen}>
          New Project
        </Button>
      </HStack>
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
        {projects.map((item, idx) => (
          <Grid
            key={idx}
            templateColumns={columnTemplate}
            gap={4}
            borderBottom="1px solid #e2e8f0"
            p={2}
          >
            <Link to={`/projects/${item._id}`}>{item.title}</Link>

            <Text>{item.description}</Text>
          </Grid>
        ))}
      </Box>
      <NewProject isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Projects;
