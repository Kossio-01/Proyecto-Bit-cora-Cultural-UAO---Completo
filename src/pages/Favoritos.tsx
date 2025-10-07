import { useEffect, useState } from 'react'
import { fetchEvents, type EventItem } from '../services/events'
import { useFavorites } from '../store/favorites'
import { 
  Stack, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  IconButton, 
  Grid,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'

function FavoriteCard({ event, onToggleFavorite }: { event: EventItem; onToggleFavorite: (id: string) => void }) {
  const navigate = useNavigate()
  
  return (
    <Card 
      onClick={() => navigate(`/eventos/${event.id}`)} 
      sx={{ 
        cursor: 'pointer', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        }
      }}
    >
      {event.imagen && (
        <CardMedia 
          component="img" 
          height="120" 
          image={event.imagen} 
          alt={event.titulo}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ flexGrow: 1 }}>{event.titulo}</Typography>
        <IconButton 
          color="error" 
          onClick={(ev) => { ev.stopPropagation(); onToggleFavorite(event.id) }}
          aria-label="quitar de favoritos"
        >
          <FavoriteIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default function Favoritos() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [events, setEvents] = useState<EventItem[]>([])
  const fav = useFavorites()
  const navigate = useNavigate()

  useEffect(() => { fetchEvents().then(setEvents) }, [])

  const favorites = events.filter((e) => fav.isFavorite(e.id))

  const handleToggleFavorite = (id: string) => {
    fav.toggle(id)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Favoritos ({favorites.length})
      </Typography>
      
      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary" variant="h6">
            Aún no has marcado favoritos.
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
            Explora los eventos y marca tus favoritos con el corazón ❤️
          </Typography>
        </Box>
      ) : isMobile ? (
        // Mobile: Single column layout
        <Stack spacing={2}>
          {favorites.map((event) => (
            <FavoriteCard 
              key={event.id} 
              event={event} 
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </Stack>
      ) : (
        // Desktop: Grid layout
        <Grid container spacing={3}>
          {favorites.map((event) => (
            <Grid item xs={12} sm={6} lg={4} key={event.id}>
              <FavoriteCard 
                event={event} 
                onToggleFavorite={handleToggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

