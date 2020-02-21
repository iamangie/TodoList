import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '../Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';


function UsersFilter({ users }) {

  const [searchName, setSearchName] = useState("");
  
  const [searchUsers, setSearchUsers] = useState([]);
  
  useEffect(() => {
    const userNames = users.map(user => user.name);
    const results = userNames.filter(person => person.toLowerCase().includes(searchName.toLowerCase()));
    setSearchUsers(results);
  }, [searchName, users]);
  
  const sortByName = () => {
    const sortedUsers = searchUsers.sort((a, b) => {
      const x = a.toLowerCase();
      const y = b.toLowerCase();
      if (x === y) {
        return 0;
      }
      return x > y ? 1: -1;
    });
    setSearchUsers(sortedUsers);
    console.log(sortedUsers)
  }
  
  return (
    <div className = "Users-filter">
      <TextField placeholder="Search" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
      {
        searchUsers.map((user, index) => {
        return(
          <List component="ul" key={index}>
            <ListItem >
            <ListItemIcon>
            <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={user} />
             </ListItem>
            <Divider />   
          </List> 
        ) 
        })
      }
    
      <Button onClick={sortByName}>
        Sort
      </Button>
    </div>
  )
}

  export default UsersFilter