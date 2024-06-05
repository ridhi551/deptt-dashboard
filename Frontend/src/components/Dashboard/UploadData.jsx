import React, { useEffect, useState } from "react";
import { Button, Label, FileInput } from "flowbite-react";
import CustomizedTables from "./CustomizedTables";
import axios from "axios";
import Swal from "sweetalert2";
import { Select } from "@chakra-ui/react";

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  
  const [selectedSemester, setSelectedSemester] = useState('all');
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      console.log("File uploaded:", file.name);
      const formData = new FormData();
      formData.append("csv", file);

      axios
        .post("pdfUpload/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your data has been uploaded.",
            showConfirmButton: false,
            timer: 1500
          });
          setFile(null);
          fetchUsers();  // Call fetchUsers again to refresh the data
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    } else {
      Swal.fire({
        title: 'Warning',
        text: 'No file selected!',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('pdfUpload/getAllData');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const filteredUsers = selectedSemester === 'all' 
    ? users 
    : users.filter(user => user.semester === selectedSemester);
  return (
    <>
      <form
        className="flex max-w-4xl mx-auto flex-col gap-4 p-10 w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload CSV File" />
          </div>
          <FileInput
            id="file"
            accept=".csv"
            required
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <select 
        placeholder="Select Semester" 
        onChange={handleSemesterChange}
        className="mb-10"
      >
        <option value="all">All</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
      </select>

      <CustomizedTables filteredUsers={filteredUsers}/>
    </>
  );
};

export default UploadData;
