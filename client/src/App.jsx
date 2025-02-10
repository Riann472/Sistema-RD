import { useState, useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Navbar from './components/l_layout/Navbar'

import Login from './pages/Login'
import Home from './pages/Home'
import Pdv from './pages/Pdv'
import Produtos from './pages/Produtos'

import NewProduct from './components/l_crud/NewProduct'
import EditProduct from './components/l_crud/EditProduct'

import { AuthContext } from './helpers/AuthContext'
import Registrar from './pages/Registrar'

function App() {
  let [user, setUser] = useState({
    username: "",
    id: 0,
    role: "",
    logged: false
  })

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      axios.get(`http://localhost:3001/users/auth`, {
        headers: { accessToken: sessionStorage.getItem('token') }
      })
        .then(res => {
          setUser({
            username: res.data.username,
            id: res.data.id,
            role: res.data.role,
            logged: true
          })
        })
    }
  }, [])


  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser }}>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/pdv' element={<Pdv />} />
            <Route path='/produtos' element={<Produtos />} />
            <Route path='/produtos/newproduct' element={<NewProduct />} />
            <Route path='/produtos/editproduct/:id' element={<EditProduct />} />
            <Route path='/register' element={<Registrar />} />
          </Routes>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
