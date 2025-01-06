import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import Visualize from './pages/Visualize';

import TanStackTable from './components/TanStackTable';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<TanStackTable />} />
        <Route path="/visualize" element={<Visualize />} />
      </Routes>
    </>
  );
};

export default App;
