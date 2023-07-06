import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
export default function AddClass() {
  const { user } = useContext(AuthContext);
  const [newClass, setNewClass] = useState({});
  const handleOnchage = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    newClass[field] = value;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newClass);
    newClass.status = "pending";
    newClass.totalEnrolledStudents = 0;

    newClass.feedback = "";
    newClass.instructorName = user?.displayName;
    newClass.instructorEmail = user?.email;

    console.log(newClass);
    const response = await axios.post(
      "https://lanuage.onrender.com/create-class",
      newClass
    );
    Swal.fire("Success!", "New Class added", "success");

    console.log(response);
  };

  return (
    <div className="text-base ]">
      <section className="p-6 text-gray-100 ">
        <form
          onSubmit={handleSubmit}
          className="container w-[700px] ml-20  p-8 mx-auto space-y-6 rounded-md shadow bg-violet-400 ng-untouched ng-pristine ng-valid"
        >
          <h2 className=" text-3xl font-bold leading-tight">ADD New Class</h2>
          <div className="flex justify-around gap-4">
            <div className="w-full">
              <div>
                <label htmlFor="picture url" className="block mb-1 ml-1">
                  Picture URL
                </label>
                <input
                  onChange={handleOnchage}
                  id="picture"
                  name="pictureUrl"
                  type="url"
                  required
                  placeholder=" photo url please"
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 bg-gray-800"
                />
              </div>
              <div>
                <label htmlFor="name" className="block mb-1 ml-1">
                  Name
                </label>
                <input
                  onChange={handleOnchage}
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Course name"
                  required=""
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 bg-gray-800"
                />
              </div>

              <div>
                {" "}
                <div>
                  <label htmlFor="email" className="block mb-1 ml-1">
                    Price
                  </label>
                  <input
                    name="price"
                    onChange={handleOnchage}
                    id="number"
                    type="number"
                    placeholder="Price"
                    className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 bg-gray-800"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="number" className="block mb-1 ml-1">
                  Available Seats
                </label>
                <input
                  onChange={handleOnchage}
                  id="number"
                  type="number"
                  placeholder="Available Seats"
                  required=""
                  name="availableSeats"
                  className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 bg-gray-800"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-violet-700 focus:ring-violet-400 hover:ring-violet-400 text-gray-900"
            >
              ADD A CLASS
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
