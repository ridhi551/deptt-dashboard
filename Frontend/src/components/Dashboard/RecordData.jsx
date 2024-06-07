import { useEffect, useState } from "react";
import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";

const RecordData = () => {
  const [syllabusName, setsyllabusName] = useState("");
  const [semester, setSemester] = useState(1);
  const [file, setFile] = useState(null);
  const [allUploads, setAllUploads] = useState([]);
  const user = useSelector((state) => state.user?.userInfo);
  const handleSyllabusNameChange = (event) => {
    setsyllabusName(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (syllabusName && semester && file) {
      // You can handle the form submission logic here
      console.log("Syllabus Name:", syllabusName);
      console.log("Semester:", semester);
      console.log("File uploaded:", file.name);

      // For example, you can use FormData to send the form data to an API
      const formData = new FormData();
      formData.append("name", `Syllabus-${syllabusName}`);
      formData.append("semester", semester);
      formData.append("file", file);

      axios
        .post("/teacher/uploadRecord", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("All fields are required");
    }
  };
  useEffect(() => {
    const getAllMaterial = async () => {
      try {
        const response = await axios.get("/user/getAllRecords", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAllUploads(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getAllMaterial();
  }, [user?.semester]);
  return (
    <div className="p-10 text-xs md:text-2xl">
      {user?.role == "admin" && (
        <form
          className="flex max-w-4xl w-full mx-auto flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="syllabusName" value="Name of Syllabus" />
            </div>
            <TextInput
              id="syllabusName"
              type="text"
              placeholder="Enter the Syllabus name"
              required
              value={syllabusName}
              onChange={handleSyllabusNameChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="semester" value="Select Semester" />
            </div>
            <Select
              id="semester"
              required
              value={semester}
              onChange={handleSemesterChange}
            >
              <option value={1}>Semester 1</option>
              <option value={2}>Semester 2</option>
              <option value={3}>Semester 3</option>
              <option value={4}>Semester 4</option>
              <option value={5}>Semester 5</option>
              <option value={6}>Semester 6</option>
              <option value={7}>Semester 7</option>
              <option value={8}>Semester 8</option>
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload File (JPEG, PNG, PDF)" />
            </div>
            <FileInput
              id="file"
              accept=".jpeg,.jpg,.png,.pdf"
              required
              onChange={handleFileChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      )}

      <div className="py-10">
        {allUploads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-10 items-start sm:items-center w-full  ">
            {allUploads.map((upload) => {
              const subName = upload.name;
              return (
                <div
                  key={upload._id}
                  className="bg-gray-200 rounded-3xl flex gap-10 items-center   lg:gap-12 flex-col p-10 lg:flex-row group"
                  style={{
                    boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
                    borderRadius: "15px",
                  }}
                >
                  <div className="  h-36 overflow-hidden ">
                    <img
                      src={upload.url}
                      alt=""
                      className="group-hover:scale-105  duration-300 h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-2/3">
                    <h3 className="text-lg">
                      Syllabus Subject:{" "}
                      <span className="font-bold">{subName.split("-")[1]}</span>
                    </h3>
                    <p className="text-xl">
                      Link:
                      <a href={upload.url}>
                        {" "}
                        <span className="font-bold">Download</span>
                      </a>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          user?.role !== "teacher" && (
            <div>
              <h1 className="text-lg">No records...</h1>
              <h1 className="text-lg">
                Kindly refresh to{" "}
                <span className="text-green-500">view material</span>.
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RecordData;
