import React, {useState, useEffect} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';

import Container from '@material-ui/core/Container';
import Button from './Button';

const User = ({ id, name, deleteUser, editUser, indexUser}) => {

 const [userName, setUserName] = useState(name);

  const editUserName = ({keyCode}) => {
    console.log('keypress', keyCode)
    if(keyCode === 13) {
      console.log('edit user name !')
      editUser(id, userName);
    }
  }

   return (
    <div className="User">
      <div className="User__id">{indexUser}</div>
      <TextField onKeyDown={(e) => editUserName(e)} value={userName} onChange={(e) =>  setUserName(e.target.value) } />
      <Button
        onClick={() => { deleteUser(id) }}
      >
      Delete
      </Button>
    </div>
  );
};


const UsersFilter = ({users}) => {

  const [searchName, setSearchName] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userNames = users.map(user => user.name);
    const results = userNames.filter(person => person.toLowerCase().includes(searchName));
    setSearchResults(results);
  }, [searchName, users]);

  return (
    <div className = "Users-filter">
      <TextField placeholder="Search" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
      <ul >
        {
          searchResults.map(item => {
          return(
            <li>{item}</li>
            ) 
        })
        }
      </ul>
    </div>
  );
};

function App() {

  const [users, setUsers] = useState([
    {name: 'Jerry', id: 1 },
    {name: 'Tom', id: 2 },
  ]);
 

  const [value, setValue] = useState('Micky');

  const addUser = ({keyCode}) => {
    if(keyCode === 13) {
      setValue('');
      setUsers([...users, {name:value, id: +new Date()}]);
    } 
  }
 
  const deleteUser = (id) => {
    const remainedUsers = users.filter(u =>  u.id !== id );
    console.log(remainedUsers)

    setUsers(remainedUsers);
  }

  const editUser = (id, name) => {
    const remainedUsers = users.filter(u => u.id !== id);
    const editedUser = users.filter(u => u.id === id);
    editedUser[0].name = name;
    setUsers([...remainedUsers, ...editedUser]);
  }
    
  users.forEach((u, index) => { 
    u.indexUser = index +1;
 });

  return (
    <Container maxWidth="sm">
      <div className="App">
        <UsersFilter key={users.id} users={users}/>
        <TextField 
          label="Enter value" 
          variant="outlined" 
          onKeyDown={(e) => {addUser(e)}} 
          onChange={(e) => {setValue(e.target.value)}} 
          value={value}
        />

        {
          users.map((u) => {
            return (
              <User key={u.id} id={u.id} name={u.name} deleteUser={deleteUser} editUser={editUser} indexUser={u.indexUser}/>
            )
          })
        }
      </div>
    </Container>
  );
}

export default App;
