const AdminDashboard = () => {
  const data = [
    {
      semester: "first",
      img: "",
      link: "",
    },
    {
      semester: "second",
      img: "",
      link: "",
    },
    {
      semester: "third",
      img: "",
      link: "",
    },
    {
      semester: "fourth",
      img: "",
      link: "",
    },
    {
      semester: "fifth",
      img: "",
      link: "",
    },
    {
      semester: "sixth",
      img: "",
      link: "",
    },
    {
      semester: "seventh",
      img: "",
      link: "",
    },
    {
      semester: "eighth",
      img: "",
      link: "",
    },
  ];
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
              <button className=" py-3 px-14 text-white  font-bold text-sm lg:text-xl border-2 border-student_Admin-color rounded-full bg-student_Admin-color duration-300 active:scale-90 ">
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
