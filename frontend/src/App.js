import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavigationBar from './components/NavigationBar';
import Swal from 'sweetalert2'; 
import PubList from './components/PubList';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const url = 'http://localhost:8000/auth/check';

    fetch(url, {credentials: 'include'})
      .then(response => response.json())
      .then((datajson) => handleLogin(datajson.data.user));
  }, []);

const handleLogin = (loggedUser) => {
  setUser(loggedUser);
};

const handleLogOut = async () => {
  const url = 'http://localhost:8000/auth';
  const response = await fetch(url, {method: 'delete', credentials: 'include'});
  const datajson = await response.json();
  if(response.status === 200){
    setUser(null);
  }else{
    Swal.fire({icon: 'error', title: datajson.message});
  };
};

  return ( 
  <Container fluid>
    <BrowserRouter>
      <Row>
        <Col>
          <NavigationBar user={user} onLogin={handleLogin} onLogOut={handleLogOut}/>
        </Col>
      </Row>

      <Switch>
        <Route exact path="/">
          <PubList mode="all"/>
        </Route>

        <Route path="/favoritos">
          <PubList mode="favoritos"/>
        </Route>

        <Route path="/misPublicaciones">
          <PubList mode="misPublicaciones"/>
        </Route>
      </Switch>
    </BrowserRouter>
  </Container>
  );
};

export default App;