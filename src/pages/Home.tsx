import { useEffect, useMemo, useState } from 'react'
import { 
  Chip, 
  Stack, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Divider, 
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  Badge
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { fetchEvents, type EventItem } from '../services/events'
import HeroSection from '../components/HeroSection'
import { useNavigate } from 'react-router-dom'

type QuickFilter = 'todo' | 'conciertos' | 'cultura' | 'deportes' | 'academico'

function EventCard({ event, featured = false, ranking }: { event: EventItem; featured?: boolean; ranking?: number }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/eventos/${event.id}`)
  }

  return (
    <Card 
      onClick={handleCardClick}
      variant="outlined"
      sx={{ 
        height: '450px', 
        width: '350px',
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        }
      }}
    >
      {/* Ranking Badge */}
      {ranking && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.875rem'
          }}
        >
          #{ranking}
        </Box>
      )}
      
      {/* Favorite Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)',
          }
        }}
      >
        <FavoriteBorderIcon sx={{ fontSize: 18 }} />
      </Box>
      
      {/* Multimedia Content */}
      {event.tipoMultimedia === 'video' && event.video ? (
        event.video.includes('youtube.com') || event.video.includes('youtu.be') ? (
          <Box sx={{ height: 250, width: '100%' }}>
            <iframe
              width="100%"
              height="100%"
              src={`${event.video.replace('youtu.be/', 'youtube.com/embed/').replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${event.video.split('/').pop()?.split('?')[0]}`}
              title={event.titulo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '8px' }}
            />
          </Box>
        ) : (
          <CardMedia 
            component="video" 
            height="250" 
            width="100%"
            src={event.video}
            controls
            autoPlay
            muted
            loop
            sx={{ 
              objectFit: 'cover',
              flexShrink: 0
            }}
          />
        )
      ) : event.tipoMultimedia === 'audio' && event.audio ? (
        <Box sx={{ 
          height: 250, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h4">🎵</Typography>
          <CardMedia 
            component="audio" 
            src={event.audio}
            controls
            sx={{ width: '80%' }}
          />
          <Typography variant="h6" sx={{ textAlign: 'center', px: 2 }}>
            {event.titulo}
          </Typography>
        </Box>
      ) : event.imagen ? (
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
      ) : (
        <Box sx={{ 
          height: 250, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'grey.200',
          color: 'text.secondary'
        }}>
          <Typography variant="h6">📅 Sin multimedia</Typography>
        </Box>
      )}
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 2,
        minWidth: 'auto'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.2 }}>
          {event.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {new Date(event.fecha).toLocaleDateString('es-CO', {
            weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
          })} • {new Date(event.fecha).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {event.lugar}
        </Typography>
      </CardContent>
    </Card>
  )
}

function FeaturedEvents({ events }: { events: EventItem[] }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  if (events.length === 0) return null
  
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
        Eventos Destacados cerca de Cali
      </Typography>
      
      {isMobile ? (
        <Stack spacing={2}>
          {events.slice(0, 2).map((event, index) => (
            <EventCard key={event.id} event={event} featured={true} ranking={index + 1} />
          ))}
        </Stack>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 3 },
        }}>
          {events.slice(0, 4).map((event, index) => (
            <Box key={event.id} sx={{ minWidth: 350, flex: '0 0 auto' }}>
              <EventCard event={event} featured={true} ranking={index + 1} />
            </Box>
          ))}
        </Box>
      )}
      
      <Divider sx={{ mt: 4 }} />
    </Box>
  )
}

function RecommendedSection({ events }: { events: EventItem[] }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  if (events.length === 0) return null
  
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
        Recomendados para ti
      </Typography>
      
      {isMobile ? (
        <Stack spacing={2}>
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Stack>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 3 },
        }}>
          {events.slice(0, 5).map((event) => (
            <Box key={event.id} sx={{ minWidth: 350, flex: '0 0 auto' }}>
              <EventCard event={event} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

function Section({ title, events }: { title: string; events: EventItem[] }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  if (events.length === 0) return null
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      
      {isMobile ? (
        // Mobile: Single column layout
        <Stack spacing={2}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Stack>
      ) : (
        // Desktop: Grid layout
        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} lg={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}
      
      <Divider sx={{ mt: 3 }} />
    </Box>
  )
}

export default function Home() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [events, setEvents] = useState<EventItem[]>([])
  const [filter, setFilter] = useState<QuickFilter>('todo')

  useEffect(() => {
    fetchEvents().then(setEvents)
  }, [])

  const { conciertos, cultura, deportes, academico, featuredEvents } = useMemo(() => {
    const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
    const by = (key: string) => events.filter((e) => normalize(e.categoria) === normalize(key))
    
    // Eventos destacados: eventos de esta semana con precio especial o categoría especial
    const now = new Date()
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    const featured = events.filter((e) => {
      const eventDate = new Date(e.fecha)
      const isThisWeek = eventDate >= now && eventDate <= weekFromNow
      const isSpecial = e.precioCOP === 0 || e.categoria === 'CONCIERTO' // Eventos gratis o conciertos
      return isThisWeek && isSpecial
    }).slice(0, 3) // Máximo 3 eventos destacados
    
    return {
      conciertos: by('CONCIERTO'),
      cultura: by('CULTURA'),
      deportes: by('DEPORTIVO'),
      academico: by('ACADEMICO'),
      featuredEvents: featured
    }
  }, [events])

  const showAll = filter === 'todo'

  return (
    <Box>
      {/* Hero Section - Solo mostrar cuando filtro es "todo" */}
      {showAll && <HeroSection />}

      {/* Filter Chips */}
      <Box sx={{ mb: 3 }}>
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { height: 4 },
            '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 2 },
          }}
        >
          <Chip 
            label="Todo" 
            color={filter === 'todo' ? 'primary' : 'default'} 
            onClick={() => setFilter('todo')}
            sx={{ minWidth: 'fit-content' }}
          />
          <Chip 
            label="Conciertos" 
            variant={filter === 'conciertos' ? 'filled' : 'outlined'} 
            onClick={() => setFilter('conciertos')}
            sx={{ minWidth: 'fit-content' }}
          />
          <Chip 
            label="Cultura" 
            variant={filter === 'cultura' ? 'filled' : 'outlined'} 
            onClick={() => setFilter('cultura')}
            sx={{ minWidth: 'fit-content' }}
          />
          <Chip 
            label="Deportes" 
            variant={filter === 'deportes' ? 'filled' : 'outlined'} 
            onClick={() => setFilter('deportes')}
            sx={{ minWidth: 'fit-content' }}
          />
          <Chip 
            label="Académico" 
            variant={filter === 'academico' ? 'filled' : 'outlined'} 
            onClick={() => setFilter('academico')}
            sx={{ minWidth: 'fit-content' }}
          />
        </Stack>
      </Box>

      {/* Featured Events - Solo mostrar cuando filtro es "todo" */}
      {showAll && <FeaturedEvents events={featuredEvents} />}

      {/* Recommended Section - Solo mostrar cuando filtro es "todo" */}
      {showAll && <RecommendedSection events={events.slice(0, 5)} />}

      {/* Content */}
      {showAll && (
        <>
          <Section title="Conciertos" events={conciertos} />
          <Section title="Cultura" events={cultura} />
          <Section title="Deportes" events={deportes} />
          <Section title="Académico" events={academico} />
        </>
      )}

      {!showAll && filter === 'conciertos' && (
        <Section title="Conciertos" events={conciertos} />
      )}
      {!showAll && filter === 'cultura' && (
        <Section title="Cultura" events={cultura} />
      )}
      {!showAll && filter === 'deportes' && (
        <Section title="Deportes" events={deportes} />
      )}
      {!showAll && filter === 'academico' && (
        <Section title="Académico" events={academico} />
      )}
    </Box>
  )
}

