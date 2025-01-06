import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import Visualize from './pages/Visualize';

import TanStackTable from './components/TanStackTable';
import NavBar from './components/NavBar';
import { MACHINE_DATA } from './data';
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/table" element={<TanStackTable tableData={MACHINE_DATA}/>} />
        <Route path="/visualize" element={<Visualize />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
