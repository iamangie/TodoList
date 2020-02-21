import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import UsersList from './containers/UsersList';
import UsersFilter from './components/UsersFilter';


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
    setUsers(remainedUsers);
  }
  
  const editUser = (id, name) => {
    const remainedUsers = users.filter(u => u.id !== id);
    const editedUser = users.filter(u => u.id === id);
    editedUser[0].name = name;
    setUsers([...remainedUsers, ...editedUser]);
  }

  return (
    <Container maxWidth="lg">
      <div className="App">
        <div>
          <TextField 
            label="Enter value" 
            variant="outlined" 
            onKeyDown={(e) => {addUser(e)}} 
            onChange={(e) => {setValue(e.target.value)}} 
            value={value}
          />
          <UsersList users={users} deleteUser={deleteUser} editUser={editUser} />
        </div>
        <UsersFilter users={users} />
      </div>
    </Container>
  );
}

export default App;
