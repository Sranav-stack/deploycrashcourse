import { Box } from "@chakra-ui/react"
import {Route,Routes} from "react-router-dom"
import CreatePage from "./Pages/CreatePage"
import HomePage from "./Pages/HomePage"
import Navbar from "./components/Navbar"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';



function App() {
  const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked) => {
    if (typeof checked !== 'boolean') {
      throw new Error("Expected a boolean value");
    }
    setDarkMode(checked);
  };

  return (
    <Box minH="100vh" bg="gray.800">
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </Box>
  );
}

export default App;
