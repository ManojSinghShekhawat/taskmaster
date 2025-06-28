import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { MdHelpOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  const handleLogout = () => {
    const res = axiosInstance.post("/api/v1/users/logout");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Box
        boxShadow={"0px 2px 2px rgba(0, 0, 0, 0.25)"}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        px={2}
      >
        <HStack>
          <Heading>
            <Flex gap={2} alignItems={"center"}>
              <Box>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_7)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 2.5H14L12 8.5L14 14.5H2L4 8.5L2 2.5Z"
                      fill="#121417"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_7">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Box>
              <Link to="/home">Taskmaster</Link>
            </Flex>
          </Heading>
          {isAuthenticated && (
            <HStack gap={4} cursor={"pointer"} fontSize={"sm"} ml={4}>
              <Link to="/tasks">My Tasks</Link>
              <Link to="/inbox">Inbox</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/reports">Reports</Link>
            </HStack>
          )}
        </HStack>
        <HStack>
          {isAuthenticated && (
            <>
              <Input
                placeholder="Search"
                size="sm"
                w={"200px"}
                border={"none"}
              />
              <MdHelpOutline />
              <Menu>
                <MenuButton>
                  <Avatar size={"sm"} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </HStack>
      </Box>
    </>
  );
};
