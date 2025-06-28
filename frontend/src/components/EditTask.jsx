import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Select as ReactSelect } from "chakra-react-select";
import TagInput from "./InputTags";
import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const toast = useToast();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
    assignees: [],
    tags: [],
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/tasks/${id}`);
        const data = res.data.task;
        const assignees = data.assignees
          .map((id) => {
            const userData = users.find((u) => u._id === id);
            return userData
              ? { value: userData._id, label: userData.name }
              : null;
          })
          .filter(Boolean);

        setTask({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          dueDate: data.dueDate,
          assignees,
          tags: data.tags.map((tag) => tag.name),
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (id) fetchTask();
  }, [id, users]);

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

  const handletaskUpdate = async () => {
    try {
      const res = await axiosInstance.put(`/api/v1/tasks/${id}`, task);
      if (res.status === 200) {
        toast({
          title: "Task Updated Successfully",
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

  return (
    <Box p={4} w={"50%"} m="auto">
      <Heading size={"md"}>Edit Your Task</Heading>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Enter title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Enter description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <Select
          placeholder="Select status"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Due Date</FormLabel>
        <Input
          placeholder="Enter due date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Priority</FormLabel>
        <Select
          placeholder="Select Priority"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Assignees</FormLabel>
        <ReactSelect
          placeholder="Select assignees"
          isMulti
          name="assignees"
          options={users.map((user) => ({
            value: user._id,
            label: users.find((u) => u._id === user._id).name,
          }))}
          value={task.assignees}
          onChange={(selectedOptions) =>
            setTask((prev) => ({
              ...prev,
              assignees: selectedOptions,
            }))
          }
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
      <Button mt={4} w={"100%"} onClick={handletaskUpdate}>
        Submit
      </Button>
    </Box>
  );
};

export default EditTask;
