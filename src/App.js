import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("CLIENT_GET_UERS");
      setIsLoading(true);
      try {
        const response = await fetch("users");
        const users = await response.json();
        setUsers(users);
        setUsersError(null);
        setIsLoading(false);
      } catch (e) {
        setUsers([]);
        setUsersError(e.message);
        console.log(usersError);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />
      </header>
      <main className="App-main">
        {usersError && <div>{usersError}</div>}
        {users.length === 0 && !isLoading && (
          <div>
            <h1>Users:</h1>
            <p>No users could be found</p>
          </div>
        )}
        {users.length !== 0 && !isLoading && (
          <div>
            <h1>Users:</h1>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
        )}
        {isLoading && (
          <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
