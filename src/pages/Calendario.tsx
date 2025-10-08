import { useState } from 'react'
import { Box, Typography, Container, Grid, Card, CardContent, Chip, Stack, IconButton, Tooltip } from '@mui/material'
import Calendar from '../components/Calendar'
import { type EventItem } from '../services/events'
import { useNavigate } from 'react-router-dom'
import { useCalendar } from '../store/calendar'
import EventIcon from '@mui/icons-material/Event'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Calendario() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const navigate = useNavigate()
  const calendarStore = useCalendar()

  const handleEventClick = (event: EventItem) => {
    setSelectedEvent(event)
    navigate(`/eventos/${event.id}`)
  }

  const handleRemoveEvent = (eventId: string, event: React.MouseEvent) => {
    event.stopPropagation() // Evitar que se ejecute handleEventClick
    calendarStore.removeEvent(eventId)
  }

  const handleDateClick = (date: Date) => {
    console.log('Fecha seleccionada:', date)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header simple */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <CalendarMonthIcon />
            Mi Calendario
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tus eventos marcados
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
          {/* Calendario - Lado izquierdo (ancho fijo) */}
          <Box sx={{ width: { xs: '100%', md: 360 }, flex: '0 0 auto' }}>
            <Calendar 
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
            />
          </Box>

          {/* Lista de eventos marcados - Lado derecho con panel desplazable */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <Card elevation={2} sx={{ maxHeight: { xs: 'none', md: '70vh' }, overflowY: { md: 'auto' } }}>
              <CardContent sx={{ pt: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EventIcon fontSize="small" />
                  Mis Eventos ({calendarStore.events.length})
                </Typography>

                {calendarStore.events.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No tienes eventos marcados
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Ve a cualquier evento y haz clic en "Agregar al calendario"
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2} sx={{ pb: 1 }}>
                    {calendarStore.events.map((event) => (
                      <Grid item xs={12} key={event.id} sx={{ width: '100%' }}>
                        <Card 
                          sx={{ 
                            width: '100%',
                            cursor: 'pointer',
                            display: 'grid',
                            gridTemplateColumns: '1fr auto auto',
                            alignItems: 'center',
                            px: 2,
                            py: 1,
                            mb: 1,
                            height: 92,
                            minHeight: 92,
                            maxHeight: 92,
                            boxSizing: 'border-box',
                            overflow: 'hidden',
                            '&:hover': { 
                              transform: 'translateY(-2px)',
                              boxShadow: 4
                            },
                            transition: 'all 0.2s ease-in-out'
                          }}
                          onClick={() => handleEventClick(event as EventItem)}
                        >
                          <Box sx={{ minWidth: 0, pr: 2 }}>
                            <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ lineHeight: 1.2 }}>
                              {event.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap sx={{ lineHeight: 1.2 }}>
                              📅 {new Date(event.fecha).toLocaleDateString('es-CO', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap sx={{ lineHeight: 1.2 }}>
                              📍 {event.lugar}
                            </Typography>
                          </Box>
                          <Box sx={{ justifySelf: 'end' }}>
                            <Chip 
                              label={event.categoria} 
                              size="medium" 
                              color="primary"
                            />
                          </Box>
                          <Box sx={{ justifySelf: 'end', ml: 1 }}>
                            <Tooltip title="Quitar del calendario">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={(e) => handleRemoveEvent(event.id, e)}
                                sx={{ 
                                  '&:hover': { 
                                    backgroundColor: 'error.light',
                                    color: 'white'
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
