import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import axios from "axios";

const MaterialUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [assignmentName, setAssignmentName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [semester, setSemester] = useState(1);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assignmentName", assignmentName);
    formData.append("semester", semester);

    try {
      await axios.post(
        "http://localhost:5000/api/v1/teacher/uploadAssignment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
     
      setIsOpen(false);
    } catch (error) {
      console.error("Error uploading material:", error);
    }
  };

  return (
    <>
      <h1 onClick={() => setIsOpen(true)}>Material Upload</h1>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Assignment Name</FormLabel>
              <Input
                type="text"
                value={assignmentName}
                onChange={(e) => setAssignmentName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Semester</FormLabel>
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                {/* Add more options for other semesters */}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Upload File</FormLabel>
              <Input type="file" onChange={handleFileChange} accept="application/pdf" />
            </FormControl>
            <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
              Save
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MaterialUpload;
