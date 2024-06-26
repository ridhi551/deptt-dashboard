import { useEffect } from "react";
import ImageCard from "../components/ui/ImageCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import teacher from "/assets/teacher.jpg";
import student from "/assets/student.jpg";
import admin from "/assets/admin.jpg";
const Auth = () => {
  const user = useSelector((state) => state.user.userInfo);
  console.log("user: ", user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <div className="flex flex-col p-10 lg:flex-row lg:items-center gap-10 lg:justify-center items-center min-h-screen">
      <ImageCard
        image={student}
        text={"Login as Student"}
        link={"./user"}
        buttonText={"Login"}
      />
      <ImageCard
        image={teacher}
        text={"Login as Teacher"}
        link={"./teacher"}
        buttonText={"Login"}
      />
      <ImageCard
        image={admin}
        text={"Login as Admin"}
        link={"./admin"}
        buttonText={"Login"}
      />
    </div>
  );
};

export default Auth;
