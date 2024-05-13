import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileModal from "../Home/ProfileModal";
import { Avatar, Navbar } from "flowbite-react";
const Header = () => {
  const user = useSelector((state) => state.user?.userInfo);
  const [show, setShow] = useState(false);
  return (
    <div className="px-2 md:px-10 py-6">
      <Navbar fluid rounded className="relative">
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="AcademIQ-Connect Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            AcademIQ-Connect
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user ? (
            <button className="cursor-pointer" onClick={() => setShow(!show)}>
              <Avatar
                src={user?.pic}
                className="size-10 rounded-2xl"
                alt="Logo"
              />
            </button>
          ) : (
            <li>
              <Link
                to="/auth"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Login
              </Link>
            </li>
          )}

          {show && <ProfileModal isOpenProp={show} />}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="absolute md:relative top-full left-0 bg-white rounded ">
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
