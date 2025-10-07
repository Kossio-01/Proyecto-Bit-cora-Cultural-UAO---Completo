import { useState } from 'react'
import { Box, Typography, Container, Grid, Card, CardContent, Chip, Stack } from '@mui/material'
import Calendar from '../components/Calendar'
import { type EventItem } from '../services/events'
import { useNavigate } from 'react-router-dom'
import { useCalendar } from '../store/calendar'
import EventIcon from '@mui/icons-material/Event'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

export default function Calendario() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const navigate = useNavigate()
  const calendarStore = useCalendar()

  const handleEventClick = (event: EventItem) => {
    setSelectedEvent(event)
    navigate(`/eventos/${event.id}`)
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

        <Grid container spacing={4}>
          {/* Calendario - Lado izquierdo */}
          <Grid item xs={12} md={7}>
            <Calendar 
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
            />
          </Grid>

          {/* Lista de eventos marcados - Lado derecho */}
          <Grid item xs={12} md={5}>
            <Card elevation={2}>
              <CardContent>
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
                  <Grid container spacing={2}>
                    {calendarStore.events.map((event) => (
                      <Grid item xs={12} key={event.id}>
                        <Card 
                          sx={{ 
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            p: 2,
                            mb: 2,
                            '&:hover': { 
                              transform: 'translateY(-2px)',
                              boxShadow: 4
                            },
                            transition: 'all 0.2s ease-in-out'
                          }}
                          onClick={() => handleEventClick(event as EventItem)}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                              {event.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              📅 {new Date(event.fecha).toLocaleDateString('es-CO', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              📍 {event.lugar}
                            </Typography>
                          </Box>
                          <Box sx={{ ml: 2 }}>
                            <Chip 
                              label={event.categoria} 
                              size="medium" 
                              color="primary"
                            />
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
