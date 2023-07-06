import { useMutation, useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

export default function Class() {
  const { user } = useContext(AuthContext);

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    async function checkUserRole() {
      const response = await axios.get(
        `https://lanuage.onrender.com/user/${user?.email}`
      );
      if (response?.data?.email) {
        setUserRole(response.data?.role);
      }
    }
    checkUserRole();
  }, [user]);
  console.log(userRole);
  const query = useQuery({
    queryKey: ["class"],
    queryFn: async () => {
      const response = await axios.get(`https://lanuage.onrender.com/approved-class`);
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
            src={c?.pictureUrl}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
          />
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-wide">
                {c?.name}
              </h2>

              <p>Class Name : English</p>
              <p>Instructor Name: {c?.instructorName}</p>
              <p>Instructor Email : {c?.instructorEmail}</p>
              <p>Price : {c?.price}</p>
              <p>Available Seats : {c?.availableSeats}</p>
              <p>Total Enrolled : {c?.totalEnrolledStudents}</p>
              <button
                onClick={() => {
                  if (user?.email) {
                    mutation.mutate(c);
                  } else {
                    Swal.fire("Error!", "Please Login First");
                  }
                }}
                disabled={
                  c?.availableSeats == 0 ||
                  userRole == "admin" ||
                  userRole == "instructor"
                    ? true
                    : false
                }
                type="button"
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
              >
                SELECT CLASS
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    // <div className="text-base grid grid-cols-3 mt-10 justify-items-center  mb-10 ">
    //   <div className="max-w-xs rounded-md mb-10 shadow-md bg-gray-900 text-gray-100">
    //     <img
    //       src="https://source.unsplash.com/random/300x300/?2"
    //       alt=""
    //       className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
    //     />
    //     <div className="flex flex-col justify-between p-6 space-y-8">
    //       <div className="space-y-2">
    //         <h2 className="text-3xl font-semibold tracking-wide">
    //           Donec lectus leo
    //         </h2>
    //         <p className="text-gray-100">
    //           Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
    //         </p>
    //         <p>Class Name : English</p>
    //         <p>Instructor Name: Koushik</p>
    //         <p>Instructor Email : k@gmail.com</p>
    //         <p>Price : 4545</p>
    //       </div>
    //       <button
    //         type="button"
    //         className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
    //       >
    //         ADD CLASS
    //       </button>
    //     </div>
    //   </div>
    //   <div className="max-w-xs rounded-md mb-10 shadow-md bg-gray-900 text-gray-100">
    //     <img
    //       src="https://source.unsplash.com/random/300x300/?2"
    //       alt=""
    //       className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
    //     />
    //     <div className="flex flex-col justify-between p-6 space-y-8">
    //       <div className="space-y-2">
    //         <h2 className="text-3xl font-semibold tracking-wide">
    //           Donec lectus leo
    //         </h2>
    //         <p className="text-gray-100">
    //           Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
    //         </p>
    //         <p>Class Name : English</p>
    //         <p>Instructor Name: Koushik</p>
    //         <p>Instructor Email : k@gmail.com</p>
    //         <p>Price : 4545</p>
    //       </div>
    //       <button
    //         type="button"
    //         className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
    //       >
    //         ADD CLASS
    //       </button>
    //     </div>
    //   </div>
    //   <div className="max-w-xs rounded-md mb-10 shadow-md bg-gray-900 text-gray-100">
    //     <img
    //       src="https://source.unsplash.com/random/300x300/?2"
    //       alt=""
    //       className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
    //     />
    //     <div className="flex flex-col justify-between p-6 space-y-8">
    //       <div className="space-y-2">
    //         <h2 className="text-3xl font-semibold tracking-wide">
    //           Donec lectus leo
    //         </h2>
    //         <p className="text-gray-100">
    //           Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
    //         </p>
    //         <p>Class Name : English</p>
    //         <p>Instructor Name: Koushik</p>
    //         <p>Instructor Email : k@gmail.com</p>
    //         <p>Price : 4545</p>
    //       </div>
    //       <button
    //         type="button"
    //         className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
    //       >
    //         ADD CLASS
    //       </button>
    //     </div>
    //   </div>
    //   <div className="max-w-xs rounded-md mb-10 shadow-md bg-gray-900 text-gray-100">
    //     <img
    //       src="https://source.unsplash.com/random/300x300/?2"
    //       alt=""
    //       className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
    //     />
    //     <div className="flex flex-col justify-between p-6 space-y-8">
    //       <div className="space-y-2">
    //         <h2 className="text-3xl font-semibold tracking-wide">
    //           Donec lectus leo
    //         </h2>
    //         <p className="text-gray-100">
    //           Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
    //         </p>
    //         <p>Class Name : English</p>
    //         <p>Instructor Name: Koushik</p>
    //         <p>Instructor Email : k@gmail.com</p>
    //         <p>Price : 4545</p>
    //       </div>
    //       <button
    //         type="button"
    //         className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
    //       >
    //         ADD CLASS
    //       </button>
    //     </div>
    //   </div>
    //   <div className="max-w-xs rounded-md mb-10  shadow-md bg-gray-900 text-gray-100">
    //     <img
    //       src="https://source.unsplash.com/random/300x300/?2"
    //       alt=""
    //       className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
    //     />
    //     <div className="flex flex-col justify-between p-6 space-y-8">
    //       <div className="space-y-2">
    //         <h2 className="text-3xl font-semibold tracking-wide">
    //           Donec lectus leo
    //         </h2>
    //         <p className="text-gray-100">
    //           Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
    //         </p>
    //         <p>Class Name : English</p>
    //         <p>Instructor Name: Koushik</p>
    //         <p>Instructor Email : k@gmail.com</p>
    //         <p>Price : 4545</p>
    //       </div>
    //       <button
    //         type="button"
    //         className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
    //       >
    //         ADD CLASS
    //       </button>
    //     </div>
    //   </div>
    //   <div className="max-w-xs rounded-md shadow-md mb-10 bg-gray-900 text-gray-100">
    //     <img
    //       src="https://source.unsplash.com/random/300x300/?2"
    //       alt=""
    //       className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
    //     />
    //     <div className="flex flex-col justify-between p-6 space-y-8">
    //       <div className="space-y-2">
    //         <h2 className="text-3xl font-semibold tracking-wide">
    //           Donec lectus leo
    //         </h2>
    //         <p className="text-gray-100">
    //           Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
    //         </p>
    //         <p>Class Name : English</p>
    //         <p>Instructor Name: Koushik</p>
    //         <p>Instructor Email : k@gmail.com</p>
    //         <p>Price : 4545</p>
    //       </div>
    //       <button
    //         type="button"
    //         className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
    //       >
    //         ADD CLASS
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
