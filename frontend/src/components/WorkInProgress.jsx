import { Box, Text, Heading, VStack, Image } from "@chakra-ui/react";

const WorkInProgress = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <VStack spacing={6} textAlign="center">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/5957/5957492.png"
          alt="Work In Progress"
          boxSize="200px"
        />
        <Heading size="lg" color="gray.700">
          Work In Progress
        </Heading>
        <Text fontSize="lg" color="gray.600">
          This page will be updated soon. Stay tuned!
        </Text>
      </VStack>
    </Box>
  );
};

export default WorkInProgress;
