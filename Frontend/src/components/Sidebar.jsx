import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import MessageIcon from "@mui/icons-material/Message";
import BookIcon from "@mui/icons-material/Book";
import LogoutIcon from "@mui/icons-material/Logout";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user?.userInfo);

  const navLinks = [
    {
      name: "Dashboard",
      path: "./",
      icon: <DashboardIcon />,
      roles: ["student", "teacher", "admin"],
    },
    {
      name: "Syllabus",
      path: "./syllabus",
      icon: <ArticleIcon />,
      roles: ["student", "teacher"],
    },
    {
      name: "Time Table",
      path: "./timetable",
      icon: <BookIcon />,
      roles: ["student", "teacher", "admin"],
    },
    {
      name: "Updates",
      path: "./updates",
      icon: <MessageIcon />,
      roles: ["student", "teacher"],
    },
    {
      name: "Material Upload",
      path: "./materialUpload",
      icon: <UploadFileIcon />,
      roles: ["teacher"],
    },
    {
      name: "Records",
      path: "./uploadData",
      icon: <UploadFileIcon />,
      roles: ["admin"],
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border-x rounded-xl mb-10 ml-10 ${
        user?.role === "teacher" ? "bg-teacher-color" : "bg-student_Admin-color"
      } text-white `}
    >
      <button
        className={`block lg:hidden absolute p-1 ml-4 text-white  ${
          user?.role === "teacher"
            ? "bg-teacher-color"
            : "bg-student_Admin-color"
        }`}
        onClick={toggleSidebar}
      >
        {!isOpen && <FaChevronRight size={20} />}
      </button>
      <div
        className={`fixed inset-0 duration-500 ${
          user?.role === "teacher"
            ? "bg-teacher-color"
            : "bg-student_Admin-color"
        }   z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:bg-transparent lg:flex lg:flex-col w-72`}
      >
        <div className=" flex flex-col mb-10 w-full max-w-xs px-2 py-10 font-semibold  lg:bg-transparent">
          {navLinks
            .filter((link) => link.roles.includes(user?.role))
            .map((link) => (
              <Link
                to={link.path}
                key={link.name}
                className={`p-6 text-2xl duration-200 hover:bg-white ${
                  user?.role === "teacher"
                    ? "hover:text-teacher-color"
                    : "hover:text-student_Admin-color"
                } font-semibold rounded-lg`}
                onClick={toggleSidebar}
              >
                <div className="flex items-center gap-1">
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            ))}
        </div>
        <div className="px-10 w-full">
          <button
            className={`w-full bg-white rounded-3xl  flex items-center justify-center gap-1 py-4   active:scale-95 duration-500 ${
              user?.role === "teacher"
                ? "text-teacher-color"
                : "text-student_Admin-color"
            } font-bold  `}
          >
            <LogoutIcon /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
