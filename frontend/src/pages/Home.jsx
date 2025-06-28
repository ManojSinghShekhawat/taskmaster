import React from "react";
import TaskCountBox from "../components/TaskCountBox";
import CurrentProjects from "../components/CurrentProjects";
import AssignedTasks from "../components/AssignedTasks";
import { Text, Heading, HStack, VStack, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export const Home = () => {
  const [currentProjects, setCurrentProjects] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const totalTasks = myTasks.length;
  const openTasks = myTasks.filter(
    (task) => task.task.status === "Not Started"
  ).length;
  const inProgressTasks = myTasks.filter(
    (task) => task.task.status === "In Progress"
  ).length;
  const completedTasks = myTasks.filter(
    (task) => task.task.status === "Completed"
  ).length;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/v1/projects/myprojects/assigned"
        );
        setCurrentProjects(res.data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/tasks/mytasks");
        setMyTasks(res.data.tasksWithProjects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);
  return (
    <VStack w={"70%"} m={"auto"} mt={4} align={"start"}>
      <Heading>Home</Heading>
      <Text>Welcome User</Text>

      <HStack width={"100%"} justifyContent={"space-evenly"}>
        <TaskCountBox heading={"Total Tasks"} count={totalTasks} />
        <TaskCountBox heading={"Opens"} count={openTasks} />
        <TaskCountBox heading={"In Progress"} count={inProgressTasks} />
        <TaskCountBox heading={"Completed"} count={completedTasks} />
      </HStack>

      <CurrentProjects currentProjects={currentProjects} />
      <AssignedTasks myTasks={myTasks} />
    </VStack>
  );
};
