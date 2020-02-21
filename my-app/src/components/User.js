import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '../Button';


function User({ id, name, deleteUser, editUser, index }) {

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
      <div className="User__id">{index + 1}</div>
      <TextField onKeyDown={(e) => editUserName(e)} value={userName} onChange={(e) =>  setUserName(e.target.value) } />
      <Button
        onClick={() => { deleteUser(id) }}
      >
      Delete
      </Button>
    </div>
  )
}

   export default User