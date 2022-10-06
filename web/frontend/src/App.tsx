import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Account from './components/Account';
import Recovery from './components/Recovery';
import { User } from './types';

function App(): JSX.Element {
  // state to track whether user has been authenticated or not -> will be prop drilled to child components
  const [user, setUser] = useState<User | null>(null);

  return (
    <Box height="100vh" bgcolor="primary.light">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Register />} />
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
