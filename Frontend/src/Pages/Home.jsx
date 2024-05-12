import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UploadModal from "../components/Home/UploadModal";
import axios from "axios";
import { useToast } from '@chakra-ui/react'
import g_logo from "/assets/g_logo.jpg";
const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.userInfo);
  
  const toast = useToast();


  const onSave = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append('csv', selectedFile);

      await axios.post('http://localhost:5000/api/v1/pdfUpload/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast({
        title: `Uploaded Succesfully`,
        position: 'top-right',
        isClosable: true,
        status: 'success',
        duration: 3000,
      })

    } catch (error) {
      toast({
        title: `${error.response.data.message}`,
        position: 'top-right',
        isClosable: true,
        status: 'error',
        duration: 3000,
      })
      console.log(error)
    }
  };



  return (
    <div className="bg-slate-200 min-h-screen w-80 ">
      <div className="flex flex-col items-center gap-20 text-2xl font-semibold cursor-pointer">
        <img src={g_logo} alt="" className="size-32 mt-10" />
        <h1 onClick={() => navigate("comingsoon")}>
          Dashboard
        </h1>
        <h1 onClick={() => navigate("comingsoon")}>Results</h1>
        <h1 onClick={() => navigate("timetable")}>Time Table</h1>
        <h1 onClick={() => navigate("comingsoon")}>Updates</h1>

        {user?.role === "teacher" && (
          <UploadModal onSave={onSave} />
        )}
      </div>
    </div>
  );
};

export default Home;
