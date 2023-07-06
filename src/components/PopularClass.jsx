import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

export default function PopularClass() {
  const { user } = useContext(AuthContext);
  const query = useQuery({
    queryKey: ["class"],
    queryFn: async () => {
      const response = await axios.get(`https://lanuage.onrender.com/classes-popular`);
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (c) => {
      const data = {
        classImage: c?.classImage,
        className: c?.className,
        studentEmail: user?.email,
        instructorEmail: c?.instructorEmail,
        instructorName: c?.instructorName,
        price: c?.price,
        enrollStatus: "pending",
        classId: c?._id,
      };

      const response = await axios.post(
        `https://lanuage.onrender.com/create-enroll`,
        data
      );
      Swal.fire("Success!", "New Class selected", "success");
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
    },
  });
  console.log(query);
  return (
    <div className="grid grid-cols-3 mx-auto my-auto justify-items-center px-5 mt-10 mb-10 text-base">
      {query.data?.map((c) => (
        <div
          key={c?._id}
          className="max-w-xs rounded-md shadow-md bg-gray-900 text-gray-100 mt-5"
        >
          <img
            src={c?.pictureUrl}
            alt=""
            className="object-cover object-center w-fit h-72 bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-thin tracking-wide">{c?.name}</h2>
              <p>Class Name : English</p>
              <p>Instructor Name: {c?.instructorName}</p>
              <p>Instructor Email : {c?.instructorEmail}</p>
              <p>Price : {c?.price}</p>
              <p>Available Seats : {c?.availableSeats}</p>
              <p>Total Students : {c?.totalEnrolledStudents}</p>
            </div>
            <button
              onClick={() => mutation.mutate(c)}
              disabled={c?.availableSeats == 0 ? true : false}
              type="button"
              className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
            >
              SELECT CLASS
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
