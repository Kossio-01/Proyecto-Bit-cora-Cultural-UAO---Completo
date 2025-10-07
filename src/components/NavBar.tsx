import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import RedeemIcon from '@mui/icons-material/Redeem'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import InfoIcon from '@mui/icons-material/Info'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const items = [
  { label: 'Inicio', icon: <HomeIcon />, path: '/' },
  { label: 'Puntos', icon: <RedeemIcon />, path: '/puntos' },
  { label: 'Buscar', icon: <SearchIcon />, path: '/filtros' },
  { label: 'Favoritos', icon: <FavoriteIcon />, path: '/favoritos' },
  { label: 'Perfil', icon: <PersonIcon />, path: '/perfil' },
  { label: 'Acerca', icon: <InfoIcon />, path: '/acerca' },
]

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  useEffect(() => {
    const idx = items.findIndex((i) => i.path === location.pathname)
    setValue(idx === -1 ? 0 : idx)
  }, [location.pathname])

  return (
    <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
          navigate(items[newValue].path)
        }}
        showLabels
      >
        {items.map((i) => (
          <BottomNavigationAction key={i.path} label={i.label} icon={i.icon} />)
        )}
      </BottomNavigation>
    </Paper>
  )
}

