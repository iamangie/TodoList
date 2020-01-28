import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

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
    <div>
        <input onKeyDown={(e) => editUserName(e)} value={userName} onChange={(e) =>  setUserName(e.target.value) } />
          <div>{id}</div>
          <Button
        variant="contained"
        color="primary"
        startIcon={<DeleteIcon />}
        onClick={() => { deleteUser(id) }}
      >
        Delete
      </Button>
    </div>
  );
};


function App() {

  
  
  const [users, setUsers] = useState([
    {name: 'Valera', id: 1,},
    {name: 'Kolya', id: 2},
  ]);

  const [value, setValue] = useState('hui');

  const addUser = ({keyCode}) => {
    if(keyCode === 13) {
      setValue('');
      setUsers([...users, {name: value, id: users.length + 1}]);
    }
  }

  const deleteUser = (id) => {
    const filteredUsers = users.filter(u => u.id !== id);
    setUsers(filteredUsers);
  }

  const editUser = (id, name) => {
    const filteredUsers = users.filter(u => u.id !== id);
    const editedUser = users.filter(u => u.id == id);
    editedUser[0].name = name;
    setUsers([...filteredUsers, ...editedUser]);
  }


  return (
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
      users.map(u => {
        return (
          <User key={u.id} id={u.id} name={u.name} deleteUser={deleteUser} editUser={editUser}/>
        )
      })
    }
    </div>
  );
}

export default App;
