import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

export default function Nav() {
  const [active, setActive] = useState("home");
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="">
      <header className="p-4 bg-gray-800 text-gray-100">
        <div className="container flex justify-between h-16 mx-auto">
          <div className="flex">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Back to homepage"
              className=" items-center p-2"
            ></a>
            <ul className="items-stretch space-x-3 lg:flex">
              <li className="flex">
                <Link
                  to={"/"}
                  onClick={() => setActive("home")}
                  className="flex items-center px-4 -mb-1 border-b-2 text-3xl border-transparent"
                >
                  Model Language Learning School{" "}
                </Link>
              </li>
              <li className="flex">
                <Link
                  to={"/"}
                  onClick={() => setActive("home")}
                  className={`flex items-center px-4 -mb-1 border-b-2 border-transparent ${
                    active == "home" && " text-violet-400 border-violet-400"
                  }`}
                >
                  {" "}
                  Home
                </Link>
              </li>
              <li className="flex">
                <Link
                  to={"/instractors"}
                  onClick={() => setActive("instractors")}
                  className={`flex items-center px-4 -mb-1 border-b-2 border-transparent ${
                    active == "instractors" &&
                    " text-violet-400 border-violet-400"
                  }`}
                >
                  Instructors
                </Link>
              </li>
              <li className="flex">
                <Link
                  to={"classes"}
                  onClick={() => setActive("classes")}
                  className={`flex items-center px-4 -mb-1 border-b-2 border-transparent ${
                    active == "classes" && " text-violet-400 border-violet-400"
                  }`}
                >
                  Classes
                </Link>
              </li>
              <li className="flex">
                <Link
                  to={"dashboard"}
                  onClick={() => setActive("dashboard")}
                  className={`flex items-center px-4 -mb-1 border-b-2 border-transparent ${
                    active == "dashboard" &&
                    " text-violet-400 border-violet-400"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {user?.email && (
              <div className="w-10 rounded-full mr-4 ">
                <img
                  alt=""
                  className="w-10 mr-5 h-10 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-violet-400 ring-offset-gray-800"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://source.unsplash.com/40x40/?portrait?1"
                  }
                />
              </div>
            )}

            {user?.email ? (
              <button
                onClick={logOut}
                className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900"
              >
                Log Out
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900"
              >
                Log in
              </Link>
            )}
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
