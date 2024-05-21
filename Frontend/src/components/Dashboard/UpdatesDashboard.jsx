import { useSelector } from "react-redux";

const UpdatesDashboard = () => {
  const updates = [
    { id: 1, title: "Title 1", description: "Description 1" },
    { id: 2, title: "Title 2", description: "Description 2" },
    { id: 3, title: "Title 3", description: "Description 3" },
    { id: 4, title: "Title 4", description: "Description 4" },
    { id: 5, title: "Title 5", description: "Description 5" },
    { id: 6, title: "Title 6", description: "Description 6" },
    { id: 7, title: "Title 7", description: "Description 7" },
    { id: 8, title: "Title 8", description: "Description 8" },
    { id: 9, title: "Title 9", description: "Description 9" },
    { id: 10, title: "Title 10", description: "Description 10" },
    { id: 11, title: "Title 11", description: "Description 11" },
    { id: 12, title: "Title 12", description: "Description 12" },
    { id: 13, title: "Title 13", description: "Description 13" },
    { id: 14, title: "Title 14", description: "Description 14" },
    { id: 15, title: "Title 15", description: "Description 15" },
    { id: 16, title: "Title 16", description: "Description 16" },
    { id: 17, title: "Title 17", description: "Description 17" },
    { id: 18, title: "Title 18", description: "Description 18" },
    { id: 19, title: "Title 19", description: "Description 19" },
    { id: 20, title: "Title 20", description: "Description 20" },
  ];

  const user = useSelector((state) => state.user?.userInfo);
  return (
    <div className="p-6">
      {user.role === "admin" && (
        <div className="flex w-full max-w-5xl mx-auto gap-6">
          <input
            type="text"
            className="p-4 w-full rounded-lg "
            placeholder="Enter message"
          />
          <button className="text-white bg-blue-700 px-6  py-2 rounded-lg">
            Send
          </button>
        </div>
      )}
      <div className="py-4 flex flex-col gap-4">
        {updates.map((update) => (
          <div
            className="bg-blue-400 p-2 rounded-md text-white "
            key={update.id}
          >
            <h1 className="font-semibold">{update.title}</h1>
            <p className="text-sm">{update.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatesDashboard;
