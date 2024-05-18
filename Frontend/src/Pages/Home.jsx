// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import UploadModal from "../components/Dashboard/UploadModal";
// import axios from "axios";
// import { useToast } from "@chakra-ui/react";
// import g_logo from "/assets/g_logo.jpg";
// import MaterialUpload from "../components/Dashboard/MaterialUpload";
// const Home = () => {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user?.userInfo);

//   const toast = useToast();

//   const onSave = async (selectedFile) => {
//     try {
//       const formData = new FormData();
//       formData.append("csv", selectedFile);

//       await axios.post(
//         "http://localhost:5000/api/v1/pdfUpload/uploadFile",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast({
//         title: `Uploaded Succesfully`,
//         position: "top-right",
//         isClosable: true,
//         status: "success",
//         duration: 3000,
//       });
//     } catch (error) {
//       toast({
//         title: `${error.response.data.message}`,
//         position: "top-right",
//         isClosable: true,
//         status: "error",
//         duration: 3000,
//       });
//       console.log(error);
//     }
//   };

//   return <></>;
// };

// export default Home;
