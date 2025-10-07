import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Stack, 
  Avatar,
  Divider,
  Chip,
  Paper
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import CodeIcon from '@mui/icons-material/Code'
import PaletteIcon from '@mui/icons-material/Palette'
import PublicIcon from '@mui/icons-material/Public'

export default function Acerca() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          component="img"
          src="/img/logo-oficial.png"
          alt="UAO"
          sx={{ 
            width: 'auto',
            height: 140,
            mx: 'auto', 
            mb: 4, // Más espacio después del logo
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Bitácora Cultural
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
          Universidad Autónoma de Occidente
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Aplicación web multimedia adaptiva para la programación cultural semanal
        </Typography>
      </Box>

      {/* Información del Proyecto */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon color="primary" />
            Sobre el Proyecto
          </Typography>
          <Typography variant="body1" paragraph>
            La <strong>Bitácora Cultural</strong> es una aplicación web multimedia adaptiva desarrollada 
            como parte del curso de <strong>Arquitectura de Sistemas Multimedia</strong> de la 
            Universidad Autónoma de Occidente en Cali.
          </Typography>
          <Typography variant="body1" paragraph>
            Esta aplicación facilita el acceso a la programación cultural semanal de la universidad, 
            presentando eventos como conciertos, exposiciones, foros de cine y charlas de manera 
            atractiva e intuitiva, adaptada a diferentes dispositivos.
          </Typography>
        </CardContent>
      </Card>

      {/* Características */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon color="primary" />
            Características Técnicas
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Tecnologías Utilizadas:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="React" color="primary" variant="outlined" />
                <Chip label="TypeScript" color="primary" variant="outlined" />
                <Chip label="Material-UI" color="primary" variant="outlined" />
                <Chip label="Vite" color="primary" variant="outlined" />
                <Chip label="Zustand" color="primary" variant="outlined" />
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Diseño:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Material Design" color="secondary" variant="outlined" />
                <Chip label="Responsive Design" color="secondary" variant="outlined" />
                <Chip label="Mobile First" color="secondary" variant="outlined" />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Información Institucional */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <PublicIcon color="primary" />
            Universidad Autónoma de Occidente
          </Typography>
          <Typography variant="body1" paragraph>
            La Universidad Autónoma de Occidente (UAO) es una institución de educación superior 
            ubicada en Cali, Colombia, reconocida por su excelencia académica y compromiso 
            con el desarrollo regional.
          </Typography>
          <Typography variant="body1" paragraph>
            Este proyecto forma parte del programa de <strong>Ingeniería Multimedia</strong> 
            y específicamente del curso de <strong>Arquitectura de Sistemas Multimedia</strong>, 
            donde los estudiantes aplican metodologías de diseño de sistemas multimedia 
            para resolver problemas reales de la comunidad universitaria.
          </Typography>
        </CardContent>
      </Card>

      {/* Licencia y Recursos */}
      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <PaletteIcon color="primary" />
          Licencia y Recursos
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Este proyecto utiliza recursos libres y gratuitos bajo licencia MIT y Creative Commons.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Desarrollado con ❤️ para la comunidad UAO
        </Typography>
      </Paper>
    </Box>
  )
}

