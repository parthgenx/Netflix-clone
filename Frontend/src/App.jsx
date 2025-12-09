import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account'; // <--- Import this
import Header from './components/Header'; // We need the header everywhere!

export default function App() {
  return (
    <>
      <Header /> {/* Put Header here so it shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} /> {/* <--- Add Route */}
      </Routes>
    </>
  );
}