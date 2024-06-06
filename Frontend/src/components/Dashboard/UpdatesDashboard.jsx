import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpdatesDashboard = () => {
  const [updates, setUpdates] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getAllupdates = async () => {
      const { data } = await axios.get("/user/getUpdates", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUpdates(data);
    };
    getAllupdates();
  }, []);
  const [selectedSender, setSelectedSender] = useState("");
  console.log(selectedSender);
  const handleSendUpdate = async () => {
    await axios.post(
      "/user/sendUpdate",
      {
        message,
        reciever: selectedSender,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  const user = useSelector((state) => state.user?.userInfo);
  return (
    <div className="p-6">
      {user.role === "admin" && (
        <form
          onSubmit={handleSendUpdate}
          className="flex w-full max-w-5xl mx-auto gap-6 items-start"
        >
          <div className="w-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-4 w-full rounded-lg "
              placeholder="Enter message"
            />
            <div className="flex gap-10 py-2">
              {/* Add radio in which it will has options student or teacher */}
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reciever"
                  value="user"
                  checked={selectedSender === "user"}
                  onChange={(e) => setSelectedSender(e.target.value)}
                />
                <label htmlFor="student">Student</label>
                <input
                  type="radio"
                  name="reciever"
                  value="teacher"
                  checked={selectedSender === "teacher"}
                  onChange={(e) => setSelectedSender(e.target.value)}
                />
                <label htmlFor="teacher">Teacher</label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-student_Admin-color px-6  py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      )}
      <div className="py-4 flex flex-col gap-4">
        <h1 className="text-lg lg:text-2xl p-2 lg:p-10 ">Latest Updates</h1>
        {updates.length > 0 ? (
          updates.map((update) => (
            <div
              className={`${
                user?.role == "teacher"
                  ? " bg-teacher-color "
                  : " bg-student_Admin-color "
              } p-4 lg:p-4 rounded-md text-white `}
              style={{
                boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
                borderRadius: "15px",
              }}
              key={update._id}
            >
              <h1 className="font-semibold">{update.message}</h1>
              {user?.role === "admin" && (
                <h6 className="text-sm">
                  To: {update.reciever === "user" ? "Student" : "Teacher"}
                </h6>
              )}
            </div>
          ))
        ) : (
          <div className="px-10">
            <div className="text-sm lg:text-xl ">
              <p>No updates...</p>
              <br />
              <p>
                Kindly refresh for{" "}
                <span className="text-green-500 font-bold">updates.</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatesDashboard;
