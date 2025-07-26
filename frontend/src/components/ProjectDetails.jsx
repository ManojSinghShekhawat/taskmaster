import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import ProjectTask from "./ProjectTask";

const ProjectDetails = ({ activeTab }) => {
  const { id } = useParams();

  const [tasksWithProjects, setTasksWithProjects] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/tasks/mytasks");
        setTasksWithProjects(res.data.tasksWithProjects);
        // console.log(res.data.tasksWithProjects);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) fetchTasks();
  }, [id]);

  // const totalTasks = tasksWithProjects.filter(
  //   (task) => task.project._id === id
  // );
  // const completedTasks = tasksWithProjects.filter(
  //   (task) => task.status === "Completed" && task.project._id === id
  // );

  // const progress = Math.round(
  //   (completedTasks.length / totalTasks.length) * 100
  // );

  return (
    <>
      <Box display={activeTab === "todo" ? "block" : "none"}>
        <ProjectTask
          tasksWithProjects={tasksWithProjects}
          projectId={id}
          status="Not Started"
        />
      </Box>
      <Box display={activeTab === "inprogress" ? "block" : "none"}>
        <ProjectTask
          tasksWithProjects={tasksWithProjects}
          projectId={id}
          status="In Progress"
        />
      </Box>
      <Box display={activeTab === "review" ? "block" : "none"}>
        <ProjectTask
          tasksWithProjects={tasksWithProjects}
          projectId={id}
          status="Review"
        />
      </Box>
      <Box display={activeTab === "done" ? "block" : "none"}>
        <ProjectTask
          tasksWithProjects={tasksWithProjects}
          projectId={id}
          status="Completed"
        />
      </Box>
    </>
  );
};

export default ProjectDetails;
