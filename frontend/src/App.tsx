import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'

const App = () => (
  <Routes>
    {/* .................ПУБЛИЧНАЯ ЧАСТЬ........................ */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>
)

export default App
