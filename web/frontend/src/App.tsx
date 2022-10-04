import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./stylesheets/App.css";
import { styled } from "@mui/material/styles";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Box } from "@mui/system";

const RootBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  background: `${theme.palette.primary.light}`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  // background: `radial-gradient(${theme.palette.primary.light} , ${theme.palette.secondary.light} 300% )`,
  // background: `radial-gradient(${theme.palette.secondary.light} -100%, ${theme.palette.primary.light} 100% )`,
}));

function App() {
  return (
    <RootBox>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </RootBox>
  );
}

export default App;
