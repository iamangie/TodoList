import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import User from "../components/User";
import Button from "../components/Button";

function UsersList() {
  const [users, setUsers] = useState([
    { name: "Jerry", id: 1 },
    { name: "Tom", id: 2 },
  ]);

  const [value, setValue] = useState("Micky");

  const [isSortByDescending, setSortType] = useState(true);

  const addUser = ({ keyCode }) => {
    if (keyCode === 13) {
      setValue("");
      setUsers([...users, { name: value, id: +new Date() }]);
    }
  };

  const deleteUser = (id) => {
    const remainedUsers = users.filter((u) => u.id !== id);
    setUsers(remainedUsers);
  };

  const editUser = (id, name) => {
    const remainedUsers = users.filter((u) => u.id !== id);
    const editedUser = users.filter((u) => u.id === id);
    editedUser[0].name = name;
    setUsers([...remainedUsers, ...editedUser]);
  };

  const saveUsers = () => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  useEffect(() => {
    const saved = localStorage.getItem("users") || [];
    setUsers(JSON.parse(saved));
  }, []);

  const sortByName = () => {
    let sortedUsers = users.sort((a, b) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if (x === y) {
        return 0;
      }
      if (isSortByDescending) {
        return x < y ? 1 : -1;
      } else {
        return x > y ? 1 : -1;
      }
    });
    setSortType(!isSortByDescending);
    setUsers([...sortedUsers]);
    setValue("");
    return null;
  };

  return (
    <div className="Users-list">
      <h1>Guest List for Birthday Party</h1>
      <TextField
        label="Enter value"
        variant="outlined"
        onKeyDown={(e) => {
          addUser(e);
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
      <ul>
        {users.map((user, index) => {
          return (
            <User
              key={user.id}
              id={user.id}
              name={user.name}
              deleteUser={deleteUser}
              editUser={editUser}
              index={index}
            />
          );
        })}
      </ul>
      <Button onClick={sortByName}>Sort</Button>
      <Button onClick={saveUsers}>Save</Button>
    </div>
  );
}

export default UsersList;
