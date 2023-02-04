import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.scss'
import Layout from './components/layout/Layout'
import Add from './pages/add/Add'
import Article from './pages/article/Article'
import Home from './pages/home/Home'

const App = () => (
  <Routes>
    <Route path="/:id" element={<Layout />}>
      <Route index element={<Article />} />
    </Route>
    <Route path="/add" element={<Layout />}>
      <Route index element={<Add />} />
    </Route>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
  </Routes>
)

export default App
