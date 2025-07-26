import { Box, Grid, Text, Heading, Button } from "@chakra-ui/react";
const columnTemplate = "2fr 2fr 2fr 1fr"; // Adjust column widths as needed
const headers = ["Project", "Status", "Due Date", "Progress"];
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const CurrentProjects = ({ currentProjects }) => {
  return (
    <>
      <Heading fontSize="xl" mt={4}>
        Current Projects
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
        {currentProjects.map((item, idx) => (
          <Grid
            key={item._id}
            templateColumns={columnTemplate}
            gap={4}
            borderBottom="1px solid #e2e8f0"
            p={2}
          >
            <Link to={`/projects/${item._id}`}>{item.title}</Link>

            <Text>{item.status}</Text>

            <Text>{item.dueDate.split("T")[0]}</Text>

            <Text>{item.progress}</Text>
          </Grid>
        ))}
      </Box>
      <Button onClick={() => fetchAllTasks(currentProjects)}>View All</Button>
    </>
  );
};

export default CurrentProjects;
