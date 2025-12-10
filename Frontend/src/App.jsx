import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Payment from './pages/Payment';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute'; 

export default function App() {
  return (
    <>
      <Toaster position="top-center" /> 
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* PROTECTED ROUTES (Only logged in users can see these) */}
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/account" 
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}