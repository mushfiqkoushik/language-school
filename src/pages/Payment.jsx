import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function Payment() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const data = location?.state;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const payMutation = useMutation({
    mutationFn: async () => {
      const paydata = {
        data,
        payment: {
          cardEmail: email,
          cardName: name,
          cardNumber: number,
        },
        studentEmail: data?.studentEmail,
      };

      console.log(paydata);
      const response = await axios.post(
        `https://lanuage.onrender.com/payment-history`,
        paydata
      );
      await axios.patch(`https://lanuage.onrender.com/enroll/${data?._id}`, {
        enrollStatus: "success",
      });
      await axios.patch(`https://lanuage.onrender.com/class-seat/${data?.classId}`);
      Swal.fire("Success!", " Payment Success", "success");
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["SavedClass", "EnrollClass"],
      });
    },
  });
  console.log(data);
  return (
    <div>
      <section className="antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
        <div className="h-full">
          {/* <!-- Pay component --> */}
          <div>
            {/* <!-- Card background --> */}
            <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
              <img
                className="rounded-t shadow-lg"
                src="https://preview.cruip.com/mosaic/images/pay-bg.jpg"
                width="460"
                height="180"
                alt="Pay background"
              />
            </div>
            {/* <!-- Card body --> */}
            <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto mt-5">
              <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
                {/* <!-- Card header --> */}

                {/* <!-- Toggle --> */}

                <div className="card">
                  <div className="space-y-4">
                    {/* <!-- Card Number --> */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-nr"
                      >
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id="card-nr"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="1234 1234 1234 1234"
                      />
                    </div>
                    {/* <!-- Expiry and CVC --> */}
                    <div className="flex space-x-4"></div>
                    {/* <!-- Name on Card --> */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-name"
                      >
                        Name on Card <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="card-name"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="text"
                        placeholder="John Doe"
                      />
                    </div>
                    {/* <!-- Email --> */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="card-email"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                        id="card-email"
                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                        type="email"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  {/* <!-- Form footer --> */}
                  <div className="mt-6">
                    <div className="mb-4">
                      <button
                        className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                        onClick={() => payMutation.mutate()}
                      >
                        Pay Now ${data?.price}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
