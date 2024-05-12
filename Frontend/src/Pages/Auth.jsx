import { useEffect } from "react";
import ImageCard from "../components/ui/ImageCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import teacher from "/assets/teacher.jpg"
import student from "/assets/student.jpg"
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
    <div className="flex flex-col p-10 md:flex-row md:items-center gap-10 md:justify-center items-center min-h-screen">
      <ImageCard
        image={ student }
        text={"Login as Student"}
        link={"./student"}
        buttonText={"Login"}
      />
      <ImageCard
        image={teacher}
        text={"Login as Teacher"}
        link={"./teacher"}
        buttonText={"Login"}
      />
    </div>
  );
};

export default Auth;
