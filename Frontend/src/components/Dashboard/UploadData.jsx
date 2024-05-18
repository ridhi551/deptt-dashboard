import { useState } from "react";
import { Button, Label, FileInput } from "flowbite-react";

const UploadData = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      // You can handle the file upload logic here
      console.log("File uploaded:", file.name);
      // For example, you can use FormData to send the file to an API
      const formData = new FormData();
      formData.append("file", file);

      // Assuming you have an endpoint to handle the file upload
      fetch("/api/upload", {
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
      console.log("No file selected");
    }
  };

  return (
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
  );
};

export default UploadData;
