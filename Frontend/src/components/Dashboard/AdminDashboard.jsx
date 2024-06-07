
import {useNavigate} from "react-router-dom"

const AdminDashboard = () => {

  const navigate = useNavigate()

  const data = [
 
    {
      semester: "second",
      img: "",
      link: "",
      num:2
    },

    {
      semester: "fourth",
      img: "",
      link: "",
      num:4
    },
 
    {
      semester: "sixth",
      img: "",
      link: "",
      num:6
    },
    {
      semester: "eighth",
      img: "",
      link: "",
    },
  ];

  const handleClick =(num)=>{
    navigate(`uploadData/${num}`)
  }

  return (
    <div>
      <h1 className="my-10 font-bold text-xl lg:text-3xl">Semesters</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="px-10 py-12 border-student_Admin-color border-2 bg-[#7878aa80]  rounded-3xl  text-student_Admin-color flex items-center justify-between"
          >
            <div className="flex flex-col gap-2 items-start justify-center">
              <h1 className="capitalize text-xl lg:text-2xl font-bold">
                {item.semester} semester
              </h1>
              <button className=" py-3 px-14 text-white  font-bold text-sm lg:text-xl border-2 border-student_Admin-color rounded-full bg-student_Admin-color duration-300 active:scale-90 "
              onClick={()=>handleClick(item.num)}>
                View
              </button>
            </div>
            <img src={item.img} alt={item.semester} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
