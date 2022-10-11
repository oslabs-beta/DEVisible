import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Account from './components/Account';
import Recovery from './components/Recovery';
import { User } from './types';
import Landing from './components/Landing';
import AboutTheTeam from './components/AboutTheTeam';
// import MasterDependencies from './components/MasterDependencies';

function App(): JSX.Element {
  // state to track whether user has been authenticated or not -> will be prop drilled to child components
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('/userAPI/login')
      .then((res) => res.json())
      .then((responseObj) => {
        if (responseObj.username) {
          setUser(responseObj);
        } else {
          setUser(null);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      bgcolor="primary.light"
      width="100vw"
    >
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/signup"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/home" element={<Dashboard user={user} />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/about" element={<AboutTheTeam />} />
          {/* <Route path="/deps" element={<MasterDependencies />} /> */}
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
