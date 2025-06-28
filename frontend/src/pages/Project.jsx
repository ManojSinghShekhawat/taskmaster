import React, { useEffect } from "react";
import Filter from "../components/Filter";
import ProjectDetails from "../components/ProjectDetails";
import ProjectStatusHeader from "../components/ProjectStatusHeader";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { projectLoad } from "../redux/slices/projectSlice";

const Project = () => {
  const [activeTab, setActiveTab] = useState("todo");
  const id = useParams();
  const dispatch = useDispatch();

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const [project, setProject] = useState({});
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/projects/${id.id}`);
        setProject(res.data.project);
        dispatch(projectLoad(res.data.project));
      } catch (error) {
        console.log(error);
      }
    };
    if (id) fetchProject();
  }, [id]);

  return (
    <>
      <Box m={4} display={"flex"} flexDirection={"row"}>
        <Filter />
        <Box width={"80%"} ml={5}>
          <ProjectStatusHeader
            handleClick={handleClick}
            title={project.title}
            id={id}
          />
          <ProjectDetails activeTab={activeTab} />
        </Box>
      </Box>
    </>
  );
};

export default Project;
