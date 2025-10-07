import { Box, Typography, Container } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 2,
        px: 2,
        backgroundColor: 'white',
        color: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 'auto',
        borderTop: '2px solid',
        borderColor: 'primary.main',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ flex: '0 0 40%' }}>
            <Typography variant="body2" sx={{ fontSize: '0.75rem', lineHeight: 1.3 }}>
              Campus Valle del Lili - Calle 25 No. 115-85 km 2, vía a Jamundí • PBX: (602) 318 8000 • www.uao.edu.co • Cali, Colombia
            </Typography>
          </Box>
          
          <Box sx={{ flex: '0 0 60%' }}>
            <Typography variant="body2" sx={{ fontSize: '0.7rem', lineHeight: 1.3 }}>
              Personería jurídica, Res. 0618 del 20 de febrero de 1970, Gobernación del Valle del Cauca. Universidad Autónoma de Occidente, Res. No. 2766 del 13 de noviembre de 2003, Ministerio de Educación Nacional. Acreditación Institucional de Alta Calidad, Res. 23002 del 30 de noviembre de 2021, con vigencia hasta el 2025. Acreditación Internacional de Alta Calidad, acuerdo No. 85 del 26 de enero de 2022 del Cinda. Vigilada MinEducación.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
