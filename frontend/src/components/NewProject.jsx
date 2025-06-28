import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../utils/axiosInstance";

import { useState, useEffect, use } from "react";
import { Select } from "chakra-react-select";

const NewProject = ({ isOpen, onClose }) => {
  const [Project, setProject] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [users, setUsers] = useState([]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProjects) => ({
      ...prevProjects,
      [name]: value,
    }));
  };

  const handleTeamMemberChange = (selectedOptions) => {
    setTeamMembers((prev) => ({
      ...prev,
      teamMembers: selectedOptions,
    }));
  };

  const handleProjectCreation = async () => {
    const projectData = {
      ...Project,
      teamMembers: teamMembers.teamMembers.map((member) => member.value),
    };
    console.log(projectData);
    try {
      const res = await axiosInstance.post("/api/v1/projects/new", projectData);
      console.log(res);
      if (res.status === 201) {
        toast({
          title: "Project Created Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Project created:", Project);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Project Title</FormLabel>
            <Input
              placeholder="Project name"
              name="title"
              value={Project.title}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder=" Add Description"
              name="description"
              value={Project.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Team Members</FormLabel>
            <Select
              placeholder="Select Team Members"
              options={users.map((user) => ({
                value: user._id,
                label: user.name,
              }))}
              name="teamMembers"
              isMulti
              value={teamMembers.teamMembers}
              onChange={handleTeamMemberChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              name="dueDate"
              value={Project.dueDate}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" w={"100%"} onClick={handleProjectCreation}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewProject;
