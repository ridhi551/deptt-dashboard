import { useState } from "react";
import { Button, Label, TextInput, Select, FileInput } from "flowbite-react";

const MaterialUpload = () => {
  const [assignmentName, setAssignmentName] = useState("");
  const [semester, setSemester] = useState("semester1");
  const [file, setFile] = useState(null);

  const handleAssignmentNameChange = (event) => {
    setAssignmentName(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (assignmentName && semester && file) {
      // You can handle the form submission logic here
      console.log("Assignment Name:", assignmentName);
      console.log("Semester:", semester);
      console.log("File uploaded:", file.name);

      // For example, you can use FormData to send the form data to an API
      const formData = new FormData();
      formData.append("assignmentName", assignmentName);
      formData.append("semester", semester);
      formData.append("file", file);

      // Assuming you have an endpoint to handle the file upload
      fetch("/api/upload-assignment", {
        method: "POST",
        body: formData,
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

  return (
    <div className="p-10 text-xs md:text-2xl">
      <form
        className="flex max-w-4xl w-full mx-auto flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="assignmentName" value="Name of Assignment" />
          </div>
          <TextInput
            id="assignmentName"
            type="text"
            placeholder="Enter the assignment name"
            required
            value={assignmentName}
            onChange={handleAssignmentNameChange}
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
            <option value="semester1">Semester 1</option>
            <option value="semester2">Semester 2</option>
            <option value="semester3">Semester 3</option>
            <option value="semester4">Semester 4</option>
            <option value="semester4">Semester 5</option>
            <option value="semester4">Semester 6</option>
            <option value="semester4">Semester 7</option>
            <option value="semester4">Semester 8</option>
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
    </div>
  );
};

export default MaterialUpload;