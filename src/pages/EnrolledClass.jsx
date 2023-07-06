import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

export default function EnrolledClass() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const query = useQuery({
    queryKey: ["EnrollClass"],
    queryFn: async () => {
      const response = await axios.get(
        `https://lanuage.onrender.com/my-success-enroll/${user?.email}`
      );
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`https://lanuage.onrender.com/enroll/${id}`);
      Swal.fire("Success!", " Class Removed", "success");
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["SavedClass"] });
    },
  });

  console.log(query);

  console.log(mutation);
  return (
    <div className="mt-10 justify-items-center grid grid-cols-3 mb-10">
      {query.data?.map((c) => (
        <div
          key={c?._id}
          className={`max-w-xs rounded-md mb-10 shadow-md ${
            c?.availableSeats == 0 ? "bg-red-500" : "bg-gray-900"
          } text-gray-100`}
        >
          <img
            src={c?.classImage}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-wide">
                {c?.name}
              </h2>

              <p>Class Name : {c?.className}</p>
              <p>Instructor Name: {c?.instructorName}</p>
              <p>Instructor Email : {c?.instructorEmail}</p>
              <p>Price : {c?.price}</p>
              <p>Enrolled : {c?.enrollStatus}</p>

              <Link
                to={"/dashboard/payment"}
                state={c}
                type="button"
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
              >
                Pay Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
