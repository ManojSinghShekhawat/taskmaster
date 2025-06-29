import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        transform="scale(3)"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
