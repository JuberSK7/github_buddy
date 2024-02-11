import { useState } from "react";
import UserCard from "./UserCard";

export const Input = () => {
  const APIURL = "https://api.github.com/users/";
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      try {
        const resp = await fetch(APIURL + username);
        const data = await resp.json();
        if (data.message && data.message === "Not Found") {
          alert("Invalid username!");
          return;
        }
        setUserData(data);
        setUsername("");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          id="search"
          value={username}
          onChange={handleChange}
          placeholder="Search a GitHub User Here!"
        />
      </form>
      {userData && <UserCard userData={userData} />}
    </div>
  );
};
