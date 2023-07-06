import axios from "axios";
import React, { useEffect } from "react";

export default function Users() {
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("https://lanuage.onrender.com/users");
        return response;
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);
  return <div>Users</div>;
}
