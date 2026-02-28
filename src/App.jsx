import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tutor from './pages/Tutor'
import ExamMode from './pages/ExamMode'
import History from './pages/History'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path='/tutor' element={
          <ProtectedRoute><Tutor /></ProtectedRoute>
        } />
        <Route path='/exam' element={
          <ProtectedRoute><ExamMode /></ProtectedRoute>
        } />
        <Route path='/history' element={
          <ProtectedRoute><History /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App