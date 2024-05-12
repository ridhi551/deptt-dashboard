import { useEffect } from "react";
import ImageCard from "../components/ui/ImageCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col p-10 md:flex-row md:items-center gap-10 md:justify-center">
      <ImageCard
        image={
          "https://cloud.appwrite.io/v1/storage/buckets/6635562b00377f889fa1/files/66355753000474401ca1/view?project=6634976900023aaaa5aa&mode=admin"
        }
        text={"Login as Student"}
        link={"./student"}
        buttonText={"Login"}
      />
      <ImageCard
        image={
          "https://cloud.appwrite.io/v1/storage/buckets/6635562b00377f889fa1/files/66355760000e9568821b/view?project=6634976900023aaaa5aa&mode=admin"
        }
        text={"Login as Teacher"}
        link={"./teacher"}
        buttonText={"Login"}
      />
    </div>
  );
};

export default Auth;
