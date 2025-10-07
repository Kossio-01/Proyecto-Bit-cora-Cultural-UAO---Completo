import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Eventos from '../pages/Eventos'
import DetalleEvento from '../pages/DetalleEvento'
import Acerca from '../pages/Acerca'
import Filtros from '../pages/Filtros'
import Puntos from '../pages/Puntos'
import Favoritos from '../pages/Favoritos'
import Perfil from '../pages/Perfil'
import Calendario from '../pages/Calendario'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/filtros" element={<Filtros />} />
          <Route path="/puntos" element={<Puntos />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/eventos/:id" element={<DetalleEvento />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/calendario" element={<Calendario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

