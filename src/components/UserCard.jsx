import React from "react";

export default function UserCard() {
  return (
    <div className="max-w-xs p-6  rounded-xl shadow-md bg-cyan-700 mt-10 mb-10 text-gray-50">
      <img
        src="https://i.ibb.co/rdHGWg0/download-5.jpg"
        alt=""
        className="object-cover object-center w-full h-72 bg-gray-500"
      />
      <div className="mt-6 mb-2">
        <span className="block text-xs font-medium tracking-widest uppercase text-violet-400">
          Bangla{" "}
        </span>
        <h2 className="text-xl font-semibold tracking-wide">
          Email : mrk@gmail.com
        </h2>
      </div>
      <p className="text-gray-100 text-xl">Name: Shafayet khan </p>
    </div>
  );
}
