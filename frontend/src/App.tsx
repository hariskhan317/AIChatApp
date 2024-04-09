import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound';
// import { useAuth } from './context/AuthContext'


function App() { 
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
