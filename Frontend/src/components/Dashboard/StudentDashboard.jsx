import { useSelector } from "react-redux";
import data from  "../../data/fourth.json";

const StudentDashboard = () => {
  const semester = useSelector((state) => state.user.userInfo.semester);

  // Filter data based on the user's semester
  const filteredData = data.filter(item => item.sem === semester);

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between p-2 gap-2">
      {/* Enrolled Courses */}
      <div className="lg:w-2/3">
        <h1 className="font-bold text-xl lg:text-3xl pt-10">
          Enrolled Courses
        </h1>
        {/* Courses */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 py-10">
          {filteredData?.map((item, index) => (
            <div
              key={index}
              className="px-10 py-12 border-student_Admin-color border-2 bg-[#7878aa80] rounded-3xl text-student_Admin-color flex items-center justify-between"
            >
              <div className="flex flex-col gap-2 items-start justify-center">
                <h1 className="capitalize text-xl lg:text-2xl font-bold">
                  {item.sub}
                </h1>
                <button className="py-3 px-14 text-white font-bold text-sm lg:text-xl border-2 border-student_Admin-color rounded-full bg-student_Admin-color duration-300 active:scale-90">
                  View
                </button>
              </div>
              <img src={item.img} alt={item.sub} />
            </div>
          ))}
        </div>
      </div>
      {/* Course Instructors */}
      <div className="lg:w-1/3 px-10">
        <h1 className="font-bold text-xl lg:text-3xl pt-10">
          Course Instructors
        </h1>
        <ul className="py-10 text-2xl flex flex-col gap-1 font-semibold">
          {filteredData?.map((item, index) => (
            <li key={index}>
              <h1>{item.name}</h1>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
