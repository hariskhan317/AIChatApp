import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'; 
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext' 


function App() { 
  const auth = useAuth();  
  const handleLogout = () => { 

    auth?.logout();  
  };


  return (
    <>
      <Header handleLogout={handleLogout} />
      <Routes>
        {auth?.isLoggedIn && auth.user && <Route path="/" element={<Chat />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
