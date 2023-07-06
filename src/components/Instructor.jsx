import axios from "axios";
import  { useEffect, useState } from "react";

export default function Instructor({home}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          "https://lanuage.onrender.com/users-instractors"
        );
        if(home){
          setUsers(response?.data.slice(0,5));
        }else{
          setUsers(response?.data);
        }
        
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <div className="mx-auto grid grid-cols-3 justify-items-center">
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
              Bangla{" "}
            </span>
            <h2 className="text-xl font-semibold tracking-wide">
              Email: {user?.email}
            </h2>
          </div>
          <p className="text-gray-100 text-xl">Name: {user?.name} </p>
        </div>
      ))}
    </div>
  );
}
