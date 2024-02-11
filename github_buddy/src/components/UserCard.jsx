import { useState, useEffect } from "react";
function UserCard({ userData }) {
  const [repos, setRepos] = useState([]);
  const APIURL = "https://api.github.com/users/";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const resp = await fetch(APIURL + userData.login + "/repos");
        const data = await resp.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, [userData.login]);

  return (
    <div className="card">
      <div>
        <img className="avatar" src={userData.avatar_url} alt="Starkk" />
      </div>
      <div className="user-info">
        <h2>{userData.name}</h2>
        <p>{userData.bio}</p>
        <ul className="info">
          <li>
            {userData.followers} <strong>Followers</strong>
          </li>
          <li>
            {userData.following} <strong>Following</strong>
          </li>
          <li>
            {userData.public_repos} <strong>Repos</strong>
          </li>
        </ul>
        <div id="repos">
          {repos.map((repo) => (
            <a
              key={repo.id}
              className="repo"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
