import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Button,
  useToast,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import TagInput from "./InputTags";
import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const NewTask = () => {
  const [users, setUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const { id } = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
    project: id,
  });

  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/users");
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleTaskSubmission = async () => {
    const taskData = {
      ...task,
      assignees: teamMembers.teamMembers.map((member) => member.value),
    };
    console.log(taskData);
    try {
      const res = await axiosInstance.post("/api/v1/tasks/new", taskData);
      console.log(res);
      if (res.status === 201) {
        toast({
          title: "Task Created Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTeamMemberChange = (selectedOptions) => {
    setTeamMembers((prev) => ({
      ...prev,
      teamMembers: selectedOptions,
    }));
  };

  return (
    <Box p={4} w={"50%"} m="auto">
      <Heading size={"md"}>Create New Task</Heading>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Enter title"
          name="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Enter description"
          name="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <ChakraSelect
          placeholder="Select status"
          name="status"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </ChakraSelect>
      </FormControl>
      <FormControl>
        <FormLabel>Due Date</FormLabel>
        <Input
          placeholder="Enter due date"
          name="dueDate"
          type="date"
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          value={task.dueDate}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Priority</FormLabel>
        <ChakraSelect
          placeholder="Select Priority"
          name="priority"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </ChakraSelect>
      </FormControl>
      <FormControl>
        <FormLabel>Assignees</FormLabel>
        <Select
          placeholder="Select assignees"
          isMulti
          name="assignees"
          options={users.map((user) => ({
            value: user._id,
            label: user.name,
          }))}
          onChange={handleTeamMemberChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Tags</FormLabel>
        <TagInput />
      </FormControl>
      <FormControl>
        <FormLabel>Attachements</FormLabel>
        <Input
          type="file"
          accept="image/*"
          multiple
          placeholder="Attachements"
        />
      </FormControl>
      <Button mt={4} w={"100%"} onClick={handleTaskSubmission}>
        Submit
      </Button>
    </Box>
  );
};

export default NewTask;
