
import {useNavigate} from "react-router-dom"

const AdminDashboard = () => {

  const navigate = useNavigate()

  const data = [
 
    {
      semester: "second",
      img: "https://i.pinimg.com/564x/1f/6d/59/1f6d5969512a6c19f9fe8e377220f158.jpg",
      link: "",
      num:2
    },

    {
      semester: "fourth",
      img: "https://i.pinimg.com/564x/a4/3a/83/a43a83480427896fd824280b44939830.jpg",
      link: "",
      num:4
    },
 
    {
      semester: "sixth",
      img: "https://i.pinimg.com/736x/d8/d0/7e/d8d07e450d6e57e97eee91117330fdc1.jpg",
      link: "",
      num:6
    },
    {
      semester: "eighth",
      img: "https://i.pinimg.com/564x/77/47/10/774710a5194c971f0464d9d72b5bb72c.jpg",
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
            className={`px-10 py-12 border-student_Admin-color border-2  rounded-3xl bg-purple-100 text-student_Admin-color flex items-center justify-between`}
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
              <img src={item.img} alt=""  className="size-40 rounded-3xl"/>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
