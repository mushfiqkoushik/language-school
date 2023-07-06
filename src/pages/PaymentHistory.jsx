import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
export default function PaymentHistory() {
  const { user } = useContext(AuthContext);
  const [myClass, setMyClass] = useState([]);
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          `https://lanuage.onrender.com/payment-history/${user?.email}`
        );
        setMyClass(response?.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [user]);
  console.log(myClass);
  return (
    <div className="grid grid-cols-3 gap-x-5">
      {myClass?.map((c) => (
        <div
          key={c?._id}
          className="max-w-xs rounded-md mb-10 shadow-md bg-gray-900 text-gray-100"
        >
          <img
            src={c?.data?.pictureUrl}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-wide">
                {c?.data?.name}
              </h2>

              <p>Class Name : {c?.data?.className}</p>
              <p>Instructor Name: {c?.data?.instructorName}</p>
              <p>Instructor Email : {c?.data?.instructorEmail}</p>
              <p>Price : {c?.data?.price}</p>
              <p>Status : {c?.data?.enrollStatus}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
