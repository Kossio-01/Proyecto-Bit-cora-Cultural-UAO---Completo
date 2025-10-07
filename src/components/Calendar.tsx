import { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper, 
  Chip, 
  Stack,
  useTheme,
  useMediaQuery,
  Tooltip,
  Badge
} from '@mui/material'
import { 
  ChevronLeft, 
  ChevronRight, 
  Today,
  Event as EventIcon,
  CalendarMonth
} from '@mui/icons-material'
import { fetchEvents, type EventItem } from '../services/events'
import { useCalendar } from '../store/calendar'

interface CalendarProps {
  onEventClick?: (event: EventItem) => void
  onDateClick?: (date: Date) => void
}

export default function Calendar({ onEventClick, onDateClick }: CalendarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<EventItem[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const calendarStore = useCalendar()

  useEffect(() => {
    fetchEvents().then(setEvents)
  }, [])

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Obtener el primer día del mes y cuántos días tiene
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Obtener eventos para una fecha específica (del calendario personal)
  const getEventsForDate = (date: Date) => {
    return calendarStore.events.filter(event => {
      const eventDate = new Date(event.fecha)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  // Navegación del calendario
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Manejar click en fecha
  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day)
    setSelectedDate(clickedDate)
    onDateClick?.(clickedDate)
  }

  // Generar días del mes
  const renderDays = () => {
    const days = []
    
    // Días del mes anterior (para completar la primera semana)
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, 0).getDate() - startingDayOfWeek + i + 1
      days.push(
        <Box
          key={`prev-${i}`}
          sx={{
            height: isMobile ? 40 : 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.disabled',
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }}
        >
          {prevMonthDay}
        </Box>
      )
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dayEvents = getEventsForDate(date)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = selectedDate?.toDateString() === date.toDateString()
      const isWeekend = date.getDay() === 0 || date.getDay() === 6

      days.push(
        <Tooltip
          key={day}
          title={dayEvents.length > 0 ? `${dayEvents.length} evento(s)` : ''}
          arrow
        >
          <Box
            onClick={() => handleDateClick(day)}
            sx={{
              height: isMobile ? 40 : 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'pointer',
              borderRadius: 1,
              backgroundColor: isSelected 
                ? 'primary.main' 
                : isToday 
                  ? 'primary.light' 
                  : 'transparent',
              color: isSelected 
                ? 'white' 
                : isToday 
                  ? 'primary.main' 
                  : isWeekend 
                    ? 'text.secondary' 
                    : 'text.primary',
              fontWeight: isToday ? 700 : isSelected ? 600 : 400,
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: isSelected 
                  ? 'primary.dark' 
                  : isToday 
                    ? 'primary.main' 
                    : 'action.hover',
                transform: 'scale(1.05)'
              }
            }}
          >
            {day}
            {dayEvents.length > 0 && (
              <Badge
                badgeContent={dayEvents.length}
                color="error"
                sx={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  '& .MuiBadge-badge': {
                    fontSize: '0.6rem',
                    height: 16,
                    minWidth: isMobile ? 16 : 20
                  }
                }}
              />
            )}
          </Box>
        </Tooltip>
      )
    }

    return days
  }

  // Obtener eventos del día seleccionado
  const selectedDayEvents = selectedDate ? getEventsForDate(selectedDate) : []

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid',
        borderColor: 'divider',
        maxWidth: isMobile ? '100%' : '100%',
        mx: 'auto'
      }}
    >
      {/* Header del calendario */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonth color="primary" />
          <Typography variant="h6" fontWeight={600}>
            {monthNames[month]} {year}
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <IconButton onClick={goToPreviousMonth} size="small">
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={goToToday} size="small" color="primary">
            <Today />
          </IconButton>
          <IconButton onClick={goToNextMonth} size="small">
            <ChevronRight />
          </IconButton>
        </Stack>
      </Box>

      {/* Días de la semana */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 1 }}>
        {dayNames.map((day) => (
          <Typography
            key={day}
            variant="caption"
            fontWeight={600}
            color="text.secondary"
            sx={{ textAlign: 'center', py: 1 }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      {/* Grid del calendario */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
        {renderDays()}
      </Box>

      {/* Eventos del día seleccionado */}
      {selectedDate && selectedDayEvents.length > 0 && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon fontSize="small" />
            Eventos del {selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]}
          </Typography>
          <Stack spacing={1}>
            {selectedDayEvents.map((event) => (
              <Chip
                key={event.id}
                label={event.titulo}
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => onEventClick?.(event)}
                sx={{
                  justifyContent: 'flex-start',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white'
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Mensaje cuando no hay eventos */}
      {selectedDate && selectedDayEvents.length === 0 && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No hay eventos programados para este día
          </Typography>
        </Box>
      )}
    </Paper>
  )
}
