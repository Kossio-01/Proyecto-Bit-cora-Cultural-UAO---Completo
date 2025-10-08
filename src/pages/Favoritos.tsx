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
        height: '450px',
        width: '100%',
        maxWidth: '350px',
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
          height="250" 
          image={event.imagen} 
          alt={event.titulo}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>{event.titulo}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(event.fecha).toLocaleDateString('es-CO')}
          </Typography>
          <IconButton 
            color="error" 
            onClick={(ev) => { ev.stopPropagation(); onToggleFavorite(event.id) }}
            aria-label="quitar de favoritos"
            size="small"
          >
            <FavoriteIcon />
          </IconButton>
        </Box>
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
    <Box sx={{ px: { xs: 2, md: 0 } }}>
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
      ) : (
        // Responsive grid layout
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
          {favorites.map((event) => (
            <FavoriteCard 
              key={event.id} 
              event={event} 
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

