import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RedeemIcon from '@mui/icons-material/Redeem'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HomeIcon from '@mui/icons-material/Home'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const mainNavItems = [
  { label: 'Conciertos', categoria: 'CONCIERTO' },
  { label: 'Cultura', categoria: 'CULTURA' }, // Agrupa: Exposiciones, Artes Escénicas, Festivales
  { label: 'Deportes', categoria: 'DEPORTIVO' },
  { label: 'Académico', categoria: 'ACADEMICO' }, // Agrupa: Conferencias, Entretenimiento
]

const userNavItems = [
  { label: 'Calendario', path: '/calendario', icon: <CalendarMonthIcon /> },
  { label: 'Favoritos', path: '/favoritos', icon: <FavoriteIcon /> },
  { label: 'Puntos', path: '/puntos', icon: <RedeemIcon /> },
  { label: 'Perfil', path: '/perfil', icon: <PersonIcon /> },
]

export default function TopBar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null)
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null)

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchorEl(event.currentTarget)
    setMobileMenuOpen(true)
  }

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null)
    setMobileMenuOpen(false)
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget)
    setUserMenuOpen(true)
  }

  const handleUserMenuClose = () => {
    setUserAnchorEl(null)
    setUserMenuOpen(false)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    handleMobileMenuClose()
    handleUserMenuClose()
  }

  const handleCategoryFilter = (categoria: string) => {
    // Si estamos en la página de eventos, aplicar filtro directamente
    if (location.pathname === '/eventos') {
      // Aquí podríamos usar un contexto o estado global para el filtro
      // Por ahora, navegamos con query params
      navigate(`/eventos?categoria=${categoria}`)
    } else {
      // Si estamos en otra página, ir a eventos con el filtro
      navigate(`/eventos?categoria=${categoria}`)
    }
    handleMobileMenuClose()
  }

  const handleSearchClick = () => {
    navigate('/filtros')
  }


  return (
    <>
      {/* Main Navigation Bar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Left Side - Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component="img"
              src="/img/uao-horizontal.png"
              alt="UAO"
              sx={{ 
                height: 32,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
            {/* Home Button - Solo en desktop */}
            {!isMobile && (
              <IconButton
                onClick={() => handleNavigation('/')}
                sx={{ 
                  color: 'primary.main',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(227, 6, 19, 0.1)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <HomeIcon fontSize="large" />
              </IconButton>
            )}
          </Box>

          {/* Center - Categories (Desktop only) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {mainNavItems.map((item) => (
                <Button
                  key={item.categoria}
                  onClick={() => handleCategoryFilter(item.categoria)}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 400,
                    textTransform: 'none',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Side - User Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Search Button - Solo en desktop */}
            {!isMobile && (
              <IconButton
                onClick={handleSearchClick}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white'
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            )}

            {!isMobile && (
              <>
                <Button
                  onClick={() => handleNavigation('/favoritos')}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  Favoritos
                </Button>
                <Button
                  onClick={() => handleNavigation('/puntos')}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  Puntos
                </Button>
              </>
            )}
            
            {/* Avatar - Solo en desktop */}
            {!isMobile && (
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white'
                  }
                }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            )}

            {/* Mobile Menu Button - Solo en móvil */}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuOpen}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>


      {/* User Menu */}
      <Menu
        anchorEl={userAnchorEl}
        open={userMenuOpen}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: { minWidth: 200 }
        }}
      >
        <MenuItem onClick={() => handleNavigation('/')}>
          <ListItemText>Inicio</ListItemText>
        </MenuItem>
        {userNavItems.map((item) => (
          <MenuItem key={item.path} onClick={() => handleNavigation(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
        <MenuItem onClick={() => handleNavigation('/acerca')}>
          <ListItemText>Acerca</ListItemText>
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileAnchorEl}
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: { minWidth: 250 }
        }}
      >
        <MenuItem onClick={() => handleNavigation('/')}>
          <ListItemText>Inicio</ListItemText>
        </MenuItem>
        {mainNavItems.map((item) => (
          <MenuItem key={item.categoria} onClick={() => handleCategoryFilter(item.categoria)}>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
        <MenuItem onClick={() => handleNavigation('/filtros')}>
          <ListItemText>Buscar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/puntos')}>
          <ListItemText>Puntos</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/favoritos')}>
          <ListItemText>Favoritos</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/perfil')}>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>
        {userNavItems.map((item) => (
          <MenuItem key={item.path} onClick={() => handleNavigation(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
        <MenuItem onClick={() => handleNavigation('/acerca')}>
          <ListItemText>Acerca</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
