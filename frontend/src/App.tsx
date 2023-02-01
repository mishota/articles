import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import Home from './pages/home/Home'

const App = () => (
  <Routes>
    {/* .................ПУБЛИЧНАЯ ЧАСТЬ........................ */}
    <Route path="/" element={<Home />}>
      {/* <Route index element={<Home />} /> */}
    </Route>
  </Routes>
)

export default App
