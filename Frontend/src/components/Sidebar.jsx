import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    {
      name: "Dashboard",
      path: "./",
    },

    {
      name: "Time Table",
      path: "./timetable",
    },
    {
      name: "Updates",
      path: "./updates",
    },
  ];
  const user = useSelector((state) => state.user?.userInfo);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-x md:bg-white  ">
      <button
        className="block lg:hidden p-1 ml-4    text-white bg-cyan-400 "
        onClick={toggleSidebar}
      >
        {!isOpen && <FaChevronRight size={20} />}
      </button>
      <div
        className={`fixed inset-0 bg-white  z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:bg-transparent lg:flex lg:flex-col w-80`}
      >
        <div className=" flex flex-col w-full max-w-xs px-2 py-10 font-semibold bg-white lg:bg-transparent">
          {navLinks.map((link) => (
            <Link
              to={link.path}
              key={link.name}
              className="p-6 text-2xl hover:bg-blue-400 rounded-lg"
              onClick={toggleSidebar}
            >
              {link.name}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="./uploadData"
              onClick={toggleSidebar}
              className="p-6 text-2xl hover:bg-blue-400 rounded-lg"
            >
              Upload Data
            </Link>
          )}
          {(user?.role === "teacher" || user?.role === "admin") && (
            <Link
              to="./materialUpload"
              onClick={toggleSidebar}
              className="p-6 text-2xl hover:bg-blue-400 rounded-lg"
            >
              Material Upload
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
