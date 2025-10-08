import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchEvents, type EventItem } from '../services/events'
import { Box, Button, Card, CardContent, CardMedia, Stack, Typography, IconButton, Snackbar, Alert } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useFavorites } from '../store/favorites'
import { useCalendar } from '../store/calendar'

export default function DetalleEvento() {
  const { id } = useParams()
  const [event, setEvent] = useState<EventItem | null>(null)
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const favorites = useFavorites()
  const calendar = useCalendar()

  useEffect(() => {
    fetchEvents().then((all) => setEvent(all.find((e) => e.id === id) ?? null))
  }, [id])

  // Detectar la proporción de la imagen
  useEffect(() => {
    if (event?.imagen) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        setImageAspectRatio(aspectRatio)
      }
      img.src = event.imagen
    }
  }, [event?.imagen])

  if (!event) return <Typography>Cargando...</Typography>

  const isFavorite = favorites.isFavorite(event.id)
  const handleToggleFavorite = () => {
    favorites.toggle(event.id)
  }

  // Función para agregar al calendario
  const handleAddToCalendar = () => {
    if (!event) return

    calendar.addEvent({
      id: event.id,
      titulo: event.titulo,
      fecha: event.fecha,
      lugar: event.lugar,
      categoria: event.categoria,
      imagen: event.imagen
    })

    setSnackbarMessage('Evento agregado a tu calendario personal')
    setSnackbarOpen(true)
  }

  // Determinar si la imagen es vertical o horizontal
  const isVerticalImage = imageAspectRatio !== null && imageAspectRatio < 1
  const imageHeight = isVerticalImage ? '600px' : '350px'

  return (
    <Card>
      {/* Multimedia Content */}
      {event.tipoMultimedia === 'video' && event.video ? (
        event.video.includes('youtube.com') || event.video.includes('youtu.be') ? (
          <Box sx={{ height: imageHeight, width: '100%' }}>
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
            height={imageHeight}
            src={event.video}
            controls
            autoPlay
            muted
            loop
            sx={{
              objectFit: 'contain',
              objectPosition: 'center',
              width: '100%',
              backgroundColor: '#f5f5f5'
            }}
          />
        )
      ) : event.tipoMultimedia === 'audio' && event.audio ? (
        <Box sx={{ 
          height: imageHeight, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          flexDirection: 'column',
          gap: 3,
          px: 4
        }}>
          <Typography variant="h2">🎵</Typography>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
            {event.titulo}
          </Typography>
          <CardMedia 
            component="audio" 
            src={event.audio}
            controls
            sx={{ width: '100%', maxWidth: '500px' }}
          />
        </Box>
      ) : event.imagen ? (
        <CardMedia 
          component="img" 
          height={imageHeight}
          image={event.imagen} 
          alt={event.titulo}
          sx={{
            objectFit: 'contain',
            objectPosition: 'center',
            width: '100%',
            backgroundColor: '#f5f5f5'
          }}
        />
      ) : (
        <Box sx={{ 
          height: imageHeight, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'grey.200',
          color: 'text.secondary'
        }}>
          <Typography variant="h4">📅 Sin multimedia</Typography>
        </Box>
      )}
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography color="primary" variant="caption">{event.categoria}</Typography>
            <IconButton 
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "quitar de favoritos" : "agregar a favoritos"}
            >
              {isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
          
          <Typography variant="h6">{event.titulo}</Typography>

          <Stack direction="row" flexWrap="wrap" spacing={2}>
            <Box sx={{ minWidth: 140, flex: 1 }}>
              <Typography variant="caption" color="text.secondary">FECHA Y HORA</Typography>
              <Typography variant="body2">{new Date(event.fecha).toLocaleString('es-CO')}</Typography>
            </Box>
            <Box sx={{ minWidth: 140, flex: 1 }}>
              <Typography variant="caption" color="text.secondary">LUGAR</Typography>
              <Typography variant="body2">{event.lugar}</Typography>
            </Box>
            <Box sx={{ minWidth: 140, flex: 1 }}>
              <Typography variant="caption" color="text.secondary">DURACIÓN</Typography>
              <Typography variant="body2">{event.duracion ?? '—'}</Typography>
            </Box>
            <Box sx={{ minWidth: 140, flex: 1 }}>
              <Typography variant="caption" color="text.secondary">ENTRADA</Typography>
              <Typography variant="body2">{event.entrada ?? '—'}</Typography>
            </Box>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {event.descripcion}
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            {typeof event.precioCOP === 'number' && typeof event.precioPts === 'number' && (
              <Typography variant="body2" color="text.secondary">
                Precio: {event.precioCOP > 0 ? `$${event.precioCOP.toLocaleString('es-CO')}` : 'Gratis'} {event.precioPts > 0 ? ` / ${event.precioPts} pts` : ''}
              </Typography>
            )}
            <Button 
              variant={calendar.isInCalendar(event.id) ? "outlined" : "contained"}
              color="primary" 
              startIcon={<CalendarMonthIcon />}
              onClick={handleAddToCalendar}
            >
              {calendar.isInCalendar(event.id) ? "En mi calendario" : "Agregar al calendario"}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<ShareIcon />} 
              onClick={() => navigator.share?.({ title: event.titulo, text: event.descripcion, url: window.location.href })}
            >
              Compartir
            </Button>
          </Box>
        </Stack>
      </CardContent>
      
      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  )
}

