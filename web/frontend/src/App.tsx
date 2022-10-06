import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Account from './components/Account';
import Recovery from './components/Recovery';
import Landing from './components/Landing';

function App(): JSX.Element {
  // state to track whether user has been authenticated or not -> will be prop drilled to child components
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <Box height="100vh" bgcolor="primary.light">
      <BrowserRouter>
        <Navbar auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/recovery" element={<Recovery />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
