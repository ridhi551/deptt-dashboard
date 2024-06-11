import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const App = () => {
  const [sem4, setSem4] = useState([]);
  const [sem6, setSem6] = useState([]);

  useEffect(() => {
    const teacherMap = new Map();
    teacherMap.set("Dr. Jyoti Mahajan", 1);
    teacherMap.set("Dr Bhawna Sharma", 2);
    teacherMap.set("Dr Simmi Dutta", 3);
    teacherMap.set("Mr Bilal Ahmed", 4);
    teacherMap.set("Mr Prabjot Singh", 5);
    teacherMap.set("Mr Akhil Sir", 6);
    teacherMap.set("Dr Sheetal Gandotra", 7);
    teacherMap.set("Ms Ankita Sharma", 8);
    teacherMap.set("Remedial Class", 9);
    teacherMap.set("Library", 10);
    teacherMap.set("Lab 1", 11);
    teacherMap.set("Lab 2", 12);

    const getTimetableFromStorage = (key) => {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    };

    const setTimetableInStorage = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    };

    const generateTimetable = () => {
      const Sem4 = Array(5).fill(null).map(() => Array(4).fill(null));
      const Sem6 = Array(5).fill(null).map(() => Array(4).fill(null));

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const teacherNames = Array.from(teacherMap.keys());
      const shuffledTeacherNames = shuffleArray(teacherNames.slice());
      let index = 0;

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
          Sem4[i][j] = shuffledTeacherNames[index % shuffledTeacherNames.length];
          index++;
        }
      }

      shuffleArray(shuffledTeacherNames);
      index = 0;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
          let assignedTeacher = shuffledTeacherNames[index % shuffledTeacherNames.length];
          while (Sem4[i][j] === assignedTeacher) {
            index = (index + 1) % shuffledTeacherNames.length;
            assignedTeacher = shuffledTeacherNames[index];
          }
          Sem6[i][j] = assignedTeacher;
          index++;
        }
      }

      return { Sem4, Sem6 };
    };

    const storedSem4 = getTimetableFromStorage('sem4');
    const storedSem6 = getTimetableFromStorage('sem6');

    if (storedSem4 && storedSem6) {
      setSem4(storedSem4);
      setSem6(storedSem6);
    } else {
      const { Sem4, Sem6 } = generateTimetable();
      setSem4(Sem4);
      setSem6(Sem6);
      setTimetableInStorage('sem4', Sem4);
      setTimetableInStorage('sem6', Sem6);
    }
  }, []);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00"];

  const renderTable = (data, semId) => (
    <table className="w-full mt-5 border-collapse text-white">
      <thead>
        <tr>
          <th colSpan="5" className="border border-gray-300 p-2 bg-blue-800 text-center">{semId.toUpperCase()}</th>
        </tr>
        <tr>
          <th className="border border-gray-300 p-2 bg-blue-800"></th>
          {timeSlots.map((slot, index) => (
            <th key={index} className="border border-gray-300 p-2 bg-blue-800">{slot}</th>
          ))}
          <th className="border border-gray-300 p-2 bg-blue-800">Break</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border border-gray-300 p-2 bg-black font-bold">{daysOfWeek[rowIndex]}</td>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-gray-300 p-2 text-center bg-blue-600">
                {cell || "--"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto p-4 bg-white text-center">
      <h1 className="text-2xl mb-4 text-black">TIME TABLE</h1>
      {renderTable(sem4, "sem4")}
      {renderTable(sem6, "sem6")}
    </div>
  );
};

export default App;
