import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthTabs = () => {
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <Container maxW="xl" centerContent className="p-20">
      <Box
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        background="white"
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="whatsapp">
          <TabList mb="1em">
            <Tab w="50%" p={4}>
              Login
            </Tab>
            <Tab w="50%" p={4}>
              SignUp
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{<Login />}</TabPanel>
            <TabPanel>{<Signup />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthTabs;
