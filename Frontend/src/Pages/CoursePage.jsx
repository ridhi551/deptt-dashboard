import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import data from "../data/fourth.json";

const CoursePage = () => {
  const user = useSelector((state) => state.user?.userInfo);
  const { sub } = useParams();

  // Filter the course data based on the subject received from URL params
  const course = data.find((course) => course.sub === sub);

  return (
    <div className={`text-white h-72 rounded-3xl flex flex-col lg:flex-row items-center justify-evenly lg:px-10 lg:gap-10 ${user?.role === "teacher" ? "bg-teacher-color" : "bg-student_Admin-color"}`}>
      <div className="w-full flex flex-col gap-1 px-10">
        {/* Display course name */}
        <h1 className="text-2xl lg:text-5xl">{course?.sub}</h1>
        {/* Display course description */}
        <p className="text-sm lg:text-xl text-gray-200">{course?.description}</p>
      </div>
    </div>
  );
}

export default CoursePage;
