import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("https://lanuage.onrender.com/users");
        setUsers(response?.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [isChanged]);
  const changeUserRole = async (user, update) => {
    const response = await axios.patch(
      `https://lanuage.onrender.com/user/${user?.email}`,
      { role: update }
    );
    if (response?.data?.modifiedCount == 1) {
      Swal.fire("Success!", "User role updated ", "success");
    }
    setIsChanged(!isChanged);
    console.log(response?.data);
  };
  console.log(users);
  return (
    <div className="grid grid-cols-3 gap-x-10 ">
      {users?.map((user) => (
        <div
          key={user?._id}
          className="max-w-xs p-6  rounded-xl shadow-md bg-cyan-700 mt-10 mb-10 text-gray-50"
        >
          <img
            src={user?.photoUrl}
            alt=""
            className="object-cover object-center w-full h-72 bg-gray-500"
          />
          <div className="mt-6 mb-2">
            <span className="block text-xs font-medium tracking-widest uppercase text-violet-400">
              {user?.role}
            </span>
            <h2 className="text-xl font-semibold tracking-wide">
              Email: {user?.email}
            </h2>
          </div>
          <p className="text-gray-100 text-xl">{user?.name} </p>
          <div className="flex flex-col">
            <button
              onClick={() => changeUserRole(user, "instructor")}
              className="px-2 py-2 bg-green-400 mt-2"
            >
              Make instructor
            </button>
            <button
              onClick={() => changeUserRole(user, "admin")}
              className="px-2 py-2 bg-purple-400 mt-2"
            >
              Make Admin
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
