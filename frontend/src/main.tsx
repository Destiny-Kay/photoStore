import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from './pages/Landing.tsx'
import Register from './pages/auth/Register.tsx'
import Login from './pages/auth/Login.tsx'
import Home from './pages/app/Home.tsx'
import GoogleRedirectHandler from './components/GoogleRedirectHandler.tsx'
import { Toaster } from 'sonner'
import UserAlbums from './pages/app/userAlbums.tsx'
import AlbumDetail from './pages/app/Album.tsx'
import PhotoViewer from './pages/app/PhotoViewer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position='top-center' richColors/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth'>
          <Route path='register' element={<Register />}/>
          <Route path='login' element={<Login />}/>
          <Route path='google-redirect' element={<GoogleRedirectHandler />} />
        </Route>
        <Route path='app'>
          <Route path='home' element={<Home />} />
          <Route path='users/:userId' element={<UserAlbums />} />
          <Route path='albums/:albumId' element={<AlbumDetail />} />
          <Route path='photo/:photoId' element={<PhotoViewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
