import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box,
  Typography,
  Avatar,
  Divider
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import RedeemIcon from '@mui/icons-material/Redeem'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import EventIcon from '@mui/icons-material/Event'
import InfoIcon from '@mui/icons-material/Info'
import { useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 260

const mainNavItems = [
  { label: 'Inicio', icon: <HomeIcon />, path: '/' },
  { label: 'Eventos', icon: <EventIcon />, path: '/eventos' },
  { label: 'Buscar', icon: <SearchIcon />, path: '/filtros' },
]

const userNavItems = [
  { label: 'Favoritos', icon: <FavoriteIcon />, path: '/favoritos' },
  { label: 'Puntos', icon: <RedeemIcon />, path: '/puntos' },
  { label: 'Perfil', icon: <PersonIcon />, path: '/perfil' },
]

const otherNavItems = [
  { label: 'Acerca', icon: <InfoIcon />, path: '/acerca' },
]

export default function DesktopSideNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          position: 'relative',
          height: '100vh',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 1,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          mb: 2
        }}>
          <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>
            Bitácora Cultural
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.9 }}>
            Universidad Autónoma de Occidente
          </Typography>
        </Box>
        
        <Divider />
        
        {/* Main Navigation */}
        <List sx={{ flexGrow: 1, pt: 1 }}>
          {mainNavItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* User Navigation */}
        <List sx={{ pt: 1 }}>
          {userNavItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Other Navigation */}
        <List sx={{ pt: 1 }}>
          {otherNavItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
