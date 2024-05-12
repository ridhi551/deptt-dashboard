import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [show1, setshow1] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpw] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);
  const handleclick = () => {
    setshow1(!show1);
  };
  console.log("user: ", user);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const submitHandler = async () => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      setLoading(false);
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      setLoading(false);
      return;
    }

    if (emailError || passwordError) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/user/login", { email, password });
      console.log("HI");
      localStorage.setItem("token", data.token);
      dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.log("Bye");

      console.log(error);
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
  };
  console.log("user", user);

  return (
    <VStack spacing="5px">
      <FormControl id="Email" isInvalid={!!emailError} isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your Email "
          _placeholder={{ opacity: 0.5, color: "black" }}
          onChange={(e) => setemail(e.target.value)}
        />
        <FormErrorMessage>{emailError}</FormErrorMessage>
      </FormControl>

      <FormControl id="password" isInvalid={!!passwordError} isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show1 ? "text" : "password"}
            value={password}
            placeholder="Enter Your Password"
            _placeholder={{ opacity: 0.5, color: "black" }}
            onChange={(e) => setpw(e.target.value)}
          />
          <InputRightElement w="4rem">
            <Button
              h="1.7rem"
              size="sm"
              onClick={handleclick}
              color="black"
              background="#a0a0a0"
            >
              {show1 ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{passwordError}</FormErrorMessage>
      </FormControl>
      <Button
        colorScheme="whatsapp"
        w="100%"
        color="white"
        background="green.400"
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
