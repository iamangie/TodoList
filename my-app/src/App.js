import React from 'react';
import Container from '@material-ui/core/Container';
import UsersList from './containers/UsersList';


function App() {
  return (
    <Container maxWidth="lg">
      <div className="App">
        <UsersList />
      </div>
    </Container>
  )
}

export default App;
