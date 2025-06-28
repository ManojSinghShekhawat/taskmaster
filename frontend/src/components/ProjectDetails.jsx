import React from "react";
import ProjectTodoTasks from "./ProjectTodoTasks";
import ProjectInProgressTasks from "./ProjectInProgressTasks";
import ProjectReviewTasks from "./ProjectReviewTasks";
import ProjectDoneTasks from "./ProjectDoneTasks";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";

const ProjectDetails = ({ activeTab }) => {
  const { id } = useParams();

  const [tasksWithProjects, setTasksWithProjects] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/tasks/mytasks");
        setTasksWithProjects(res.data.tasksWithProjects);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) fetchTasks();
  }, [id]);
  return (
    <>
      <Box display={activeTab === "todo" ? "block" : "none"}>
        <ProjectTodoTasks
          tasksWithProjects={tasksWithProjects}
          projectId={id}
        />
      </Box>
      <Box display={activeTab === "inprogress" ? "block" : "none"}>
        <ProjectInProgressTasks
          tasksWithProjects={tasksWithProjects}
          projectId={id}
        />
      </Box>
      <Box display={activeTab === "review" ? "block" : "none"}>
        <ProjectReviewTasks
          tasksWithProjects={tasksWithProjects}
          projectId={id}
        />
      </Box>
      <Box display={activeTab === "done" ? "block" : "none"}>
        <ProjectDoneTasks
          tasksWithProjects={tasksWithProjects}
          projectId={id}
        />
      </Box>
    </>
  );
};

export default ProjectDetails;
