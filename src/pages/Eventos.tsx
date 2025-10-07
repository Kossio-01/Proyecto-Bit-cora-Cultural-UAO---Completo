import { useEffect, useState } from 'react'
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  IconButton, 
  Box,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { fetchEvents, type EventItem } from '../services/events'
import { useFavorites } from '../store/favorites'
import { useFilters } from '../store/filters'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useSearchParams } from 'react-router-dom'

function EventCard({ event, onToggleFavorite }: { event: EventItem; onToggleFavorite: (id: string) => void }) {
  const navigate = useNavigate()
  
  return (
    <Card 
      onClick={() => navigate(`/eventos/${event.id}`)} 
      sx={{ 
        cursor: 'pointer', 
        height: '450px', 
        width: '100%', // Cambiar de 350px fijo a 100%
        maxWidth: '350px', // Máximo 350px pero puede ser menor
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
          width="100%"
          image={event.imagen} 
          alt={event.titulo}
          sx={{ 
            objectFit: 'cover',
            flexShrink: 0
          }}
        />
      )}
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 'auto'
      }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Chip label={event.categoria} size="small" color="primary" />
          <Typography variant="caption" color="text.secondary">
            {new Date(event.fecha).toLocaleString('es-CO')}
          </Typography>
          <IconButton 
            size="small" 
            sx={{ ml: 'auto' }} 
            onClick={(ev) => { ev.stopPropagation(); onToggleFavorite(event.id) }} 
            aria-label="favorito"
          >
            {useFavorites().isFavorite(event.id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Stack>
        <Typography variant="h6" sx={{ mb: 1, flexGrow: 1 }}>
          {event.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.lugar}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function Eventos() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [events, setEvents] = useState<EventItem[]>([])
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([])
  const fav = useFavorites()
  const filters = useFilters()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    fetchEvents().then(setEvents)
  }, [])

  // Aplicar filtros del store
  useEffect(() => {
    let filtered = events

    // Filtro por categoría desde URL (para navegación desde TopBar)
    const categoria = searchParams.get('categoria')
    if (categoria) {
      // Si hay una categoría en la URL, limpiar filtros anteriores y solo mostrar esa categoría
      filtered = filtered.filter((e) => 
        e.categoria.toLowerCase() === categoria.toLowerCase()
      )
    } else {
      // Solo aplicar filtros del store si NO hay categoría en URL
      
      // Filtro por categorías del store
      if (filters.categories.length > 0) {
        filtered = filtered.filter((e) => 
          filters.categories.includes(e.categoria)
        )
      }

      // Filtro por query de búsqueda
      if (filters.query) {
        const query = filters.query.toLowerCase()
        filtered = filtered.filter((e) => 
          e.titulo.toLowerCase().includes(query) ||
          e.lugar.toLowerCase().includes(query) ||
          (e.descripcion && e.descripcion.toLowerCase().includes(query))
        )
      }

      // Filtro por días de la semana
      if (filters.days.length > 0) {
        const dayMap: Record<string, number> = {
          'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4,
          'Viernes': 5, 'Sábado': 6, 'Domingo': 0
        }
        
        filtered = filtered.filter((e) => {
          const eventDate = new Date(e.fecha)
          const dayOfWeek = eventDate.getDay()
          return filters.days.some(day => dayMap[day] === dayOfWeek)
        })
      }
    }

    // Limitar a 12 eventos para evitar problemas de rendimiento
    filtered = filtered.slice(0, 12)

    setFilteredEvents(filtered)
  }, [events, filters, searchParams])

  const handleToggleFavorite = (id: string) => {
    fav.toggle(id)
  }

  // Obtener título dinámico basado en los filtros
  const getTitle = () => {
    const categoria = searchParams.get('categoria')
    if (categoria) {
      return `${categoria.charAt(0).toUpperCase() + categoria.slice(1)} (${filteredEvents.length})`
    }
    
    if (filters.categories.length > 0 || filters.query || filters.days.length > 0) {
      return `Eventos filtrados (${filteredEvents.length})`
    }
    
    return `Todos los eventos (${filteredEvents.length})`
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Botón de volver al inicio si hay filtro activo */}
      {(searchParams.get('categoria') || filters.categories.length > 0 || filters.query || filters.days.length > 0) && (
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              filters.reset()
              navigate('/')
            }}
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Volver al Inicio
          </Button>
        </Box>
      )}
      
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {getTitle()}
      </Typography>
      
      {/* Mensaje cuando hay muchos eventos */}
      {filteredEvents.length === 12 && events.length > 12 && (
        <Box sx={{ mb: 2, p: 2, backgroundColor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body2" color="info.dark">
            📋 Mostrando los primeros 12 eventos. Usa los filtros para encontrar eventos específicos.
          </Typography>
        </Box>
      )}
      
        {filteredEvents.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No se encontraron eventos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Intenta con otros filtros o vuelve a la página principal
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                filters.reset()
                navigate('/')
              }}
            >
              Ver todos los eventos
            </Button>
          </Box>
        ) : (
        <>
          {isMobile ? (
            // Mobile: Single column layout
            <Stack spacing={2}>
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </Stack>
          ) : (
            // Desktop: Grid layout
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: '1fr', 
                sm: 'repeat(auto-fit, minmax(280px, 1fr))', 
                md: 'repeat(auto-fit, minmax(300px, 1fr))', 
                lg: 'repeat(auto-fit, minmax(320px, 1fr))' 
              },
              gap: 3,
              justifyContent: 'center',
              width: '100%',
              overflow: 'hidden' // Evitar scroll horizontal
            }}>
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id}
                  event={event} 
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

