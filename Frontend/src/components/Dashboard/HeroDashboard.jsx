import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to generate random dates
const getRandomDate = (start, end) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

const HeroDashboard = () => {
  // Generate random user data
  const user = Array.from({ length: 20 }, (_, i) => ({
    name: `User${i + 1}`,
    role: i % 2 === 0 ? "student" : "teacher",
    createdDate: getRandomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)),
  }));

  // Filter users by role
  const students = user.filter((u) => u.role === "student");
  const teachers = user.filter((u) => u.role === "teacher");

  // Aggregate data by date
  const aggregateDataByDate = (users) => {
    const data = {};
    users.forEach((user) => {
      data[user.createdDate] = (data[user.createdDate] || 0) + 1;
    });
    return data;
  };

  const studentData = aggregateDataByDate(students);
  const teacherData = aggregateDataByDate(teachers);

  // Prepare data for charts
  const dates = Array.from(
    new Set([...Object.keys(studentData), ...Object.keys(teacherData)])
  ).sort();

  const studentCounts = dates.map((date) => studentData[date] || 0);
  const teacherCounts = dates.map((date) => teacherData[date] || 0);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Student Accounts",
        data: studentCounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Teacher Accounts",
        data: teacherCounts,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          User Accounts Created Day-wise
        </h2>
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "User Accounts Created Day-wise" },
            },
            scales: {
              x: {
                title: { display: true, text: "Date" },
              },
              y: {
                title: { display: true, text: "Number of Accounts" },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold mb-4">Student Details</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Teacher Details</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{teacher.name}</td>
                  <td className="py-2 px-4 border-b">{teacher.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboard;
