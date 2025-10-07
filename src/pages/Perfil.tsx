import { useEffect, useState } from 'react'
import { Avatar, Chip, Divider, Paper, Stack, Typography, Card, CardMedia, CardContent } from '@mui/material'
import { useProfile } from '../store/profile'
import { useFavorites } from '../store/favorites'
import { fetchEvents, type EventItem } from '../services/events'

export default function Perfil() {
  const profile = useProfile()
  const fav = useFavorites()
  const [events, setEvents] = useState<EventItem[]>([])

  useEffect(() => { fetchEvents().then(setEvents) }, [])
  const favoriteEvents = events.filter((e) => fav.isFavorite(e.id))

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
        <Avatar src={profile.avatarUrl} sx={{ width: 88, height: 88, mx: 'auto', mb: 1 }} />
        <Typography variant="h6">{profile.name}</Typography>
        <Typography variant="body2" color="text.secondary">{profile.email}</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <StatBox label="Eventos asistidos" value={profile.attended} />
          <StatBox label="Favoritos" value={profile.favoritesCount} />
          <StatBox label="Por asistir" value={profile.upcoming} />
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
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Próximos eventos (favoritos)</Typography>
        <Stack spacing={2}>
          {favoriteEvents.map((e) => (
            <Card key={e.id}>
              {e.imagen && <CardMedia component="img" height="120" image={e.imagen} alt={e.titulo} />}
              <CardContent>
                <Typography variant="subtitle1">{e.titulo}</Typography>
                <Typography variant="caption" color="text.secondary">{new Date(e.fecha).toLocaleString('es-CO')}</Typography>
              </CardContent>
            </Card>
          ))}
          {favoriteEvents.length === 0 && (
            <Typography color="text.secondary">No tienes eventos favoritos aún.</Typography>
          )}
        </Stack>
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

