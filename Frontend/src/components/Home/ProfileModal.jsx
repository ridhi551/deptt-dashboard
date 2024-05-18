import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/userSlice'
import Swal from 'sweetalert2'
export default function ProfileModal({ isOpenProp }) {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const user = useSelector((state) => state.user?.userInfo)
    const dispatch = useDispatch();
  

const handleLogout = () => {
    onClose(); 
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout"
  }).then((result) => {
    if (result.isConfirmed) {
        dispatch(logout());
        onClose();   
      Swal.fire({
        title: "Logged out!",
        text: "You have been logged out successfully.",
        icon: "success"
      });
    }
  });
}

    useEffect(() => {
        if (isOpenProp) {
            setOverlay(<OverlayTwo />)
            onOpen();
        }
    }, [isOpenProp, onOpen])
    return (

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
                <ModalHeader>
                    <div className='flex justify-between'>
                        <h1 className='text-4xl'>
                            My Proile
                        </h1>
                        <img src={user?.pic} alt="" className='size-14 rounded-2xl' />
                    </div>
                </ModalHeader>

                <ModalBody >
                    <div className='flex flex-col gap-4'>
                    <h1 className='text-3xl'>{user?.name}</h1>
                    <h1 className='text-2xl'>{user?.email}</h1>
                    
                    </div>
                </ModalBody>
                <ModalFooter className='flex gap-10'>
                    <Button colorScheme='gray' onClick={onClose}>Close</Button>
                    <Button colorScheme='red' onClick={handleLogout} >Logout</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}