import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from './Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


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
      <FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checked" color='primary' />}
      />
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