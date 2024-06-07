import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [rollNumber, setRollNumber] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [rollNumberError, setRollNumberError] = useState("");
  const [semester, setSemester] = useState(1);
  const [semesterError, setSemesterError] = useState("");
  const toast = useToast();
  const { role } = useParams();
  const user = useSelector((state) => state.user?.userInfo);
  const navigate = useNavigate();
  const handleclick = () => {
    setShow1(!show1);
  };
  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);
  const handleclick2 = () => {
    setShow2(!show2);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Chat App");
      data.append("cloud_name", "dq87rxvyn");
      fetch("https://api.cloudinary.com/v1_1/dq87rxvyn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
    return;
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    // At least one lowercase letter, one uppercase letter, one digit, one special character, and at least 8 characters long
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const submitHandler = async () => {
    setLoading(true);
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setRollNumberError("");
    setSemesterError("");

    if (!name) {
      setNameError("Name is required");
      setLoading(false);

      return;
    }

    if (!email) {
      setEmailError("Email is required");
      setLoading(false);

      return;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      setLoading(false);

      return;
    }
    if (role != "admin" && !rollNumber) {
      setRollNumberError("Roll number is required");
      setLoading(false);

      return;
    }
    if (role != "admin" && !semester) {
      setSemesterError("Semester is required");
      setLoading(false);

      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      setLoading(false);

      return;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
      );
      setLoading(false);

      return;
    }

    if (!confirm) {
      setConfirmError("Please confirm your password");
    } else if (password !== confirm) {
      setConfirmError("Passwords do not match");
      setLoading(false);

      return;
    }

    if (nameError || emailError || passwordError || confirmError) {
      setLoading(false);
      return;
    }

    try {
      await axios.post("/user/registerUser", {
        name,
        email,
        password,
        pic,
        role,
        semester,
        rollNumber: role == "admin" ? 1 : rollNumber,
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      setRollNumber("");
      setSemester("");
      setPic("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      toast({
        title: "Account created successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Optionally, you can redirect the user to another page after successful registration
      // navigate("/login"); // Make sure to import navigate from 'react-router-dom'
    } catch (error) {
      // Error handling
      console.log(error);
    }
    setLoading(false);
    return;
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isInvalid={!!nameError} isRequired>
        <FormLabel> Name</FormLabel>
        <Input
          placeholder="Enter Your Name "
          _placeholder={{ opacity: 0.5, color: "black" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <FormErrorMessage>{nameError}</FormErrorMessage>
      </FormControl>

      <FormControl id="Email" isInvalid={!!emailError} isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          placeholder="Enter Your Email "
          value={email}
          _placeholder={{ opacity: 0.5, color: "black" }}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <FormErrorMessage>{emailError}</FormErrorMessage>
      </FormControl>
      {role !== "admin" && (
        <>
          <FormControl
            id="roll-number"
            isInvalid={!!rollNumberError}
            isRequired
          >
            <FormLabel>
              {role === "teacher" ? "Teacher ID" : "Roll Number"}
            </FormLabel>
            <Input
              placeholder={
                role === "teacher"
                  ? "Enter Your Teacher ID"
                  : "Enter Your Roll Number"
              }
              value={rollNumber}
              type="number"
              _placeholder={{ opacity: 0.5, color: "black" }}
              onChange={(e) => setRollNumber(e.target.value)}
            ></Input>
            <FormErrorMessage>{rollNumberError}</FormErrorMessage>
          </FormControl>
          <FormControl id="semester" isInvalid={!!semesterError} isRequired>
            <FormLabel> Semester</FormLabel>
            <Select
              id="semester"
              required
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value={1}>Semester 1</option>
              <option value={2}>Semester 2</option>
              <option value={3}>Semester 3</option>
              <option value={4}>Semester 4</option>
              <option value={5}>Semester 5</option>
              <option value={6}>Semester 6</option>
              <option value={7}>Semester 7</option>
              <option value={8}>Semester 8</option>
            </Select>

            <FormErrorMessage>{semesterError}</FormErrorMessage>
          </FormControl>
        </>
      )}
      <FormControl id="password" isInvalid={!!passwordError} isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show1 ? "text" : "password"}
            placeholder="Enter Your password"
            value={password}
            _placeholder={{ opacity: 0.5, color: "black" }}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
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

      <FormControl id="confirm-password" isInvalid={!!confirmError} isRequired>
        <FormLabel> Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show2 ? "text" : "password"}
            placeholder="Confirm your Password"
            value={confirm}
            _placeholder={{ opacity: 0.5, color: "black" }}
            onChange={(e) => setConfirm(e.target.value)}
          ></Input>
          <InputRightElement w="4rem">
            <Button
              h="1.7rem"
              size="sm"
              onClick={handleclick2}
              color="black"
              background="#a0a0a0"
            >
              {show2 ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{confirmError}</FormErrorMessage>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="whatsapp"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        background="green.400"
        color="white"
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
