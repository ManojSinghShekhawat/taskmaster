import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";

const Filter = () => {
  return (
    <Box w={"20%"}>
      <Heading fontSize={"xl"}>Filter</Heading>
      <FormControl my={4}>
        <FormLabel>Status</FormLabel>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>
      <FormControl my={4}>
        <FormLabel>Assignee</FormLabel>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>
      <FormControl my={4}>
        <FormLabel>Priority</FormLabel>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>
      <FormControl my={4}>
        <FormLabel>Due Date</FormLabel>
        <Input name="email" type="date" />
      </FormControl>
      <Button w={"100%"} size={"sm"}>
        Clear Filter
      </Button>
    </Box>
  );
};

export default Filter;
