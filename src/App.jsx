import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import Visualize from './pages/Visualize';

import TanStackTable from './components/TanStackTable';
import NavBar from './components/NavBar';
import { MACHINE_DATA } from './data';

import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      <NavBar />
      <Routes>
        {true && <Route path="/table" element={<TanStackTable tableData={MACHINE_DATA}/>} />}
        {true && <Route path="/visualize" element={<Visualize />} />}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
