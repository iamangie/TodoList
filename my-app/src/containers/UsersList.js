import React from 'react';
import User from '../components/User';


function UsersList(props) {
  
  return (
    <div>
      {
        props.users.map((user, index) => {
          return (
            <User key={user.id} id={user.id} name={user.name} deleteUser={props.deleteUser} editUser={props.editUser} index={index}/>
          )
        })
      }
    </div>
    
  )
}    

export default UsersList
