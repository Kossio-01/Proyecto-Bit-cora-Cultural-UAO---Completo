import { useEffect, useState } from 'react'
import { Avatar, Chip, Divider, Paper, Stack, Typography, Card, CardMedia, CardContent, Box } from '@mui/material'
import { useProfile } from '../store/profile'
import { useFavorites } from '../store/favorites'
import { useCalendar } from '../store/calendar'
import { useRewards } from '../store/rewards'
import { fetchEvents, type EventItem } from '../services/events'
import { useNavigate } from 'react-router-dom'

export default function Perfil() {
  const profile = useProfile()
  const fav = useFavorites()
  const calendar = useCalendar()
  const rewards = useRewards()
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventItem[]>([])

  useEffect(() => { fetchEvents().then(setEvents) }, [])
  const favoriteEvents = events.filter((e) => fav.isFavorite(e.id))
  
  // Calcular estadísticas dinámicas
  const eventosCompartidos = rewards.history.filter(h => h.label.includes('Compartiste')).length
  const eventosAgendados = calendar.events.length
  const eventosFavoritos = favoriteEvents.length

  return (
    <Stack spacing={2} sx={{ px: { xs: 2, md: 0 } }}>
      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
        <Avatar src={profile.avatarUrl} sx={{ width: 88, height: 88, mx: 'auto', mb: 1 }} />
        <Typography variant="h6">{profile.name}</Typography>
        <Typography variant="body2" color="text.secondary">{profile.email}</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <StatBox label="Eventos favoritos" value={eventosFavoritos} />
          <StatBox label="Eventos compartidos" value={eventosCompartidos} />
          <StatBox label="Eventos agendados" value={eventosAgendados} />
        </Stack>
      </Paper>

      <div>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Intereses</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {profile.interests.map((i) => (
            <Chip key={i} label={i} variant="outlined" />
          ))}
        </Stack>
      </div>

      <Divider />
      <div>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Próximos eventos (favoritos)</Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(auto-fit, minmax(280px, 1fr))', 
            md: 'repeat(auto-fit, minmax(300px, 1fr))', 
            lg: 'repeat(auto-fit, minmax(320px, 1fr))' 
          }, 
          gap: 3,
          overflow: 'hidden'
        }}>
          {favoriteEvents.map((e) => (
            <Card 
              key={e.id}
              onClick={() => navigate(`/eventos/${e.id}`)}
              sx={{
                height: '450px',
                width: '100%',
                maxWidth: '350px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                }
              }}
            >
              {e.imagen ? (
                <CardMedia 
                  component="img" 
                  height="250" 
                  image={e.imagen} 
                  alt={e.titulo}
                  sx={{ objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <CardMedia 
                  component="div" 
                  sx={{ height: 250, bgcolor: 'grey.200' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" sx={{ mb: 0.5 }}>{e.titulo}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                  {new Date(e.fecha).toLocaleString('es-CO')}
                </Typography>
                <Typography variant="body2" color="text.secondary">{e.lugar}</Typography>
              </CardContent>
            </Card>
          ))}
          {favoriteEvents.length === 0 && (
            <Typography color="text.secondary">No tienes eventos favoritos aún.</Typography>
          )}
        </Box>
      </div>
    </Stack>
  )
}

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, minWidth: 90 }}>
      <Typography variant="h6" color="primary" align="center">{value}</Typography>
      <Typography variant="caption" color="text.secondary" align="center" display="block">{label}</Typography>
    </Paper>
  )
}

