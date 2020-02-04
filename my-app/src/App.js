import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';

import Container from '@material-ui/core/Container';
import Button from './Button';

const User = ({ id, name, deleteUser, editUser }) => {

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
      <div className="User__id">{id}</div>
      <TextField onKeyDown={(e) => editUserName(e)} value={userName} onChange={(e) =>  setUserName(e.target.value) } />
      <Button
        onClick={() => { deleteUser(id) }}
      >
      Delete
      </Button>
    </div>
  );
};


function App() {

  const [users, setUsers] = useState([
    {name: 'Jerry' },
    {name: 'Tom' },
  ]);

  users.forEach((user, index) => {
    user.id = index + 1;
  });

  const [value, setValue] = useState('Micky');

  const addUser = ({keyCode}) => {
    if(keyCode === 13) {
      setValue('');
      setUsers([...users, {name: value}]);
    }
  }
 
  const deleteUser = (id) => {
    const deletedUser = users.filter(u => u.id === id);
    console.log(deletedUser)
   
    const filteredUsers = users.filter(u =>  u.id !== id );
    console.log(filteredUsers)

    setUsers(filteredUsers);
  }

  const editUser = (id, name) => {
    const filteredUsers = users.filter(u => u.id !== id);
    const editedUser = users.filter(u => u.id === id);
    editedUser[0].name = name;
    setUsers([...filteredUsers, ...editedUser]);
  }

  return (
    <Container maxWidth="sm">
    <div className="App">
      <TextField 
        id="outlined-basic" 
        label="Value" 
        variant="outlined" 
        onKeyDown={(e) => {addUser(e)}} 
        onChange={(e) => {setValue(e.target.value)}} 
        value={value}
      />

      {
        users.map((u) => {
          return (
            <User key={u.id} id={u.id} name={u.name} deleteUser={deleteUser} editUser={editUser}/>
          )
        })
      }
    </div>
    </Container>
  );
}

export default App;
