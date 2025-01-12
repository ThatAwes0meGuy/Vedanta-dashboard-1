import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './pages/Home';
import Visualize from './pages/Visualize';

import TanStackTable from './components/TanStackTable';
import NavBar from './components/NavBar';
import { MACHINE_DATA } from './data';

import { useAuth0 } from "@auth0/auth0-react";
import Login from './pages/LoginPage';
import SignUp from './components/Signup';
import ProtectedRoute from "./hooks/ProtectedRoute";
import { AuthProvider } from './hooks/AuthContext';

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
    <AuthProvider>
      <NavBar />
      <Routes>
        {<Route path="/table" element={<ProtectedRoute><TanStackTable tableData={MACHINE_DATA}/></ProtectedRoute>} />}
        {<Route path="/visualize" element={<ProtectedRoute><Visualize /></ProtectedRoute>} />}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
