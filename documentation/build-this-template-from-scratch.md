[View README.md](../README.md)

This template was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) and [Express](https://github.com/expressjs/express)

# Build this template from scratch

## Step 1:

Create a new `create-react-app` project, name it create-react-app-express, and install packages

```
 npx create-react-app create-react-app-express
```

## Step 2:

Install `express` and `compression` as a dependency

```
npm install express compression --save
```

Learn more about this package:

- [express](https://github.com/expressjs/express)
- [compression](https://github.com/expressjs/compression)

## Step 3:

Install `nodemon` and `concurrently` as dev dependencies

```
npm install nodemon concurrently --save-dev
```

Learn more about these packages

- [nodemon](https://github.com/remy/nodemon)
- [concurrently](https://github.com/kimmobrunfeldt/concurrently)

## Step 4: Add `src/server/json/user.json file`

```
[
  {
    "id": 1,
    "username": "user1"
  },
  {
    "id": 2,
    "username": "user2"
  },
  {
    "id": 3,
    "username": "user3"
  }
]

```

## Step 5: Add `src/server/index.js` file

```
const express = require("express");
let fs = require("fs");
let path = require("path");
const compression = require("compression");
const app = express();

let usersFilePath = path.join(__dirname, "json/users.json");
let usersFile = fs.readFileSync(usersFilePath);
let users = JSON.parse(usersFile);

app.use(compression());
app.use(express.static("build"));

app.get("/ping", function (req, res) {
  console.log("pong");
  return res.send("pong");
});

app.get("/users", function (req, res) {
  console.log("get users");
  res.json(users);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);

```

## Step 6: Update `src/App.js` file

```
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
        {isLoading && <p>Loading</p>
        )}
      </main>
    </div>
  );
}

export default App;
```

## Step 7: Add `proxy` to `package.json`

```
"proxy": "http://localhost:8080"
```

## Step 8: Update `scripts` in `package.json`

```
    "start": "concurrently \"npm run client\" \"npm run server\"",
    "client": "react-scripts start",
    "server": "nodemon src/server",
    "build": "react-scripts build",
    "serve": "npm run build && node src/server",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
```

## Step 9: Start `create-react-app-express`

```
npm run start
```

Runs the app client and server in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
