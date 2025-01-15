import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/l_layout/Navbar'

import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Pdv from './components/pages/Pdv'
import Produtos from './components/pages/Produtos'

import NewProduct from './components/l_crud/NewProduct'
import axios from 'axios'

function App() {
  let [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/produtos").then(
      res => setProdutos(res.data)
    )
  }, [produtos])

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/pdv' element={<Pdv />} />
          <Route path='/produtos' element={<Produtos produtos={produtos} setProdutos={setProdutos} />} />
          <Route path='/produtos/newproduct' element={<NewProduct produtos={produtos} setProdutos={setProdutos} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
