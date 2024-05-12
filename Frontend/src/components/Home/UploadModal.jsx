import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'
  import { useRef, useState } from 'react'
  
  export default function UploadModal({ onSave }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedFile, setSelectedFile] = useState(null);
    const initialRef = useRef(null)
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handleSave = () => {
      if (selectedFile) {
        onSave(selectedFile);
        onClose();
      }
    };
  
    return (
      <>
        <h1 onClick={onOpen}>Upload Data</h1>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload here</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Choose PDF file</FormLabel>
                <Input ref={initialRef} type="file" onChange={handleFileChange} accept="application/pdf" />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  