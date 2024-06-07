import { useSelector } from "react-redux";
import data from  "../../data/fourth.json";

const TeacherDashboard = () => {

  const rollNumber = useSelector((state) => state.user.userInfo.rollNumber);
  const filteredData = data.filter((item) => item.tId === rollNumber); 
  console.log(filteredData , rollNumber)
  return (
    <div>
      <h1 className="my-10 font-bold text-xl lg:text-3xl">Course in charge</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="h-72 border-teacher-color border-2   rounded-3xl  text-teacher-color flex flex-col"
          >
            <div className="h-2/3 p-6 bg-[#B3C3C8] w-full rounded-t-3xl">
              <h1 className="capitalize text-xl lg:text-4xl text-teacher-color font-bold">
                {item.sub}
              </h1>
              <p>
                {item.name}
              </p>
            </div>
            <h1 className="text-2xl p-3 font-semibold capitalize">
              {item.sem} semester
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
