import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

const HeroDashboard = () => {
  const user = useSelector((state) => state.user?.userInfo);
  return (
    <div className="p-10">
      {/* Welcome Back */}
      <div
        className={` text-white h-72 rounded-3xl flex flex-col lg:flex-row items-center justify-evenly lg:px-10 lg:gap-10 ${
          user?.role === "teacher"
            ? "bg-teacher-color"
            : "bg-student_Admin-color"
        }`}
      >
        <div className="w-full flex flex-col gap-1 px-10 ">
          <h1 className="text-2xl lg:text-5xl">
            Welcome back, <span className="font-bold">{user?.name}!</span>
          </h1>
          <p className="text-sm lg:text-xl text-gray-200">
            Always stay updated in your {user?.role} portal{" "}
          </p>
        </div>
        <img className="w-full" src="" alt="hero" />
      </div>
      {/* Admin */}
      {user?.role === "admin" && <AdminDashboard />}
      {/* Teacher */}
      {user?.role === "teacher" && <TeacherDashboard />}
      {/* Student */}
      {user?.role === "student" && <StudentDashboard />}
    </div>
  );
};

export default HeroDashboard;
