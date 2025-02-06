import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from './pages/Landing.tsx'
import Register from './pages/auth/Register.tsx'
import Login from './pages/auth/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth'>
          <Route path='register' element={<Register />}/>
          <Route path='login' element={<Login />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
