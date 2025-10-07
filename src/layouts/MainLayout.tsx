import { Outlet } from 'react-router-dom'
import { 
  Container, 
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material'
import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function MainLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <TopBar />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fafafa'
        }}
      >
        {/* Content */}
        <Container 
          maxWidth="lg"
          sx={{ 
            flexGrow: 1,
            py: { xs: 3, md: 4 },
            pb: { xs: 10, md: 4 }, // Extra padding bottom on mobile for bottom nav
            px: { xs: 2, md: 3 },
          }}
        >
          <Outlet />
        </Container>
      </Box>

      {/* Mobile Bottom Navigation - Solo en móvil */}
      {isMobile && <NavBar />}
      
      {/* Footer - Siempre visible en la parte inferior */}
      <Footer />
    </Box>
  )
}

