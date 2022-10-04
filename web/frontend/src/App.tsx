import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import "./stylesheets/App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Box } from "@mui/system";
import Register from './components/Register';

function App() {
  return (
    <Box height={"100vh"} bgcolor={"primary.light"}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
