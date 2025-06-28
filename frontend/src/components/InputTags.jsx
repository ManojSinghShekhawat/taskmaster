import { Box } from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { useState } from "react";

const TagInput = () => {
  const [tags, setTags] = useState([]);

  const handleChange = (newValue) => {
    setTags(newValue);
    console.log("Tags:", newValue);
  };

  return (
    <Box m="auto">
      <CreatableSelect
        isMulti
        onChange={handleChange}
        value={tags}
        placeholder="Type and press Enter to add tags"
        closeMenuOnSelect={false}
        chakraStyles={{
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "purple.100",
            borderRadius: "full",
            paddingX: 2,
          }),
        }}
      />
    </Box>
  );
};

export default TagInput;
