import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "../components/Modal";

export default function ManageClasses() {
  const [myClass, setMyClass] = useState([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [fid, setFid] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`https://lanuage.onrender.com/classes`);
        setMyClass(response?.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, [isChanged]);

  const changeUserRole = async (c, update) => {
    const response = await axios.patch(
      `https://lanuage.onrender.com/class/${c?._id}`,
      {
        status: update,
      }
    );
    if (response?.data?.modifiedCount == 1) {
      Swal.fire("Success!", "Status updated", "success");
    }
    setIsChanged(!isChanged);
    console.log(response?.data);
  };

  const giveFeedBack = async (fid) => {
    console.log(fid);
    const response = await axios.patch(`https://lanuage.onrender.com/class/${fid}`, {
      feedback: feedbackText,
    });
    if (response?.data?.modifiedCount == 1) {
      Swal.fire("Success!", "Feedback added", "success");
      setShowModal(false);
    }
    setIsChanged(!isChanged);
    console.log(response?.data);
  };
  console.log(myClass);
  return (
    <div className="grid grid-cols-3 gap-x-5">
      {myClass?.map((c) => (
        <div
          key={c?._id}
          className="max-w-xs rounded-md mb-10 shadow-md bg-gray-900 text-gray-100"
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
              <p>Status : {c?.status}</p>
              {c?.feedback?.length > 0 && <p>Feedback : {c?.feedback}</p>}
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => changeUserRole(c, "approved")}
                className="px-2 py-2 bg-green-400 mt-2"
              >
                Approve
              </button>
              <button
                onClick={() => changeUserRole(c, "denied")}
                className="px-2 py-2 bg-purple-400 mt-2"
              >
                Deny
              </button>
              <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setFid(c?._id);
                  setShowModal(!showModal);
                }}
              >
                FeedBack
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        feedbackText={feedbackText}
        setFeedbackText={setFeedbackText}
        giveFeedBack={giveFeedBack}
        fid={fid}
      />
    </div>
  );
}
