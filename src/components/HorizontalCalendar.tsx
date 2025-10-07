import { useState } from 'react'
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper, 
  Grid,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { ChevronLeft, ChevronRight, CalendarToday } from '@mui/icons-material'
import { type EventItem } from '../services/events'

interface HorizontalCalendarProps {
  onEventClick?: (event: EventItem) => void
  onDateClick?: (date: Date) => void
}

export default function HorizontalCalendar({ onEventClick, onDateClick }: HorizontalCalendarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  // Obtener el primer día del mes y cuántos días tiene
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()
  
  // Crear array de días del mes
  const days = []
  
  // Agregar días del mes anterior para completar la semana
  const prevMonth = new Date(year, month - 1, 0)
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonth.getDate() - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, prevMonth.getDate() - i)
    })
  }
  
  // Agregar días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      isCurrentMonth: true,
      date: new Date(year, month, day)
    })
  }
  
  // Completar con días del siguiente mes
  const remainingDays = 42 - days.length // 6 semanas x 7 días
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      isCurrentMonth: false,
      date: new Date(year, month + 1, day)
    })
  }
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }
  
  const goToToday = () => {
    setCurrentDate(new Date())
  }
  
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }
  
  const isSelected = (date: Date) => {
    return date.toDateString() === currentDate.toDateString()
  }
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: 'grey.200',
        boxShadow: 'none',
      }}
    >
      {/* Header del calendario */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 3,
        px: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => navigateMonth('prev')}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { 
                backgroundColor: 'grey.100',
                color: 'text.primary'
              }
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h5" fontWeight={600} sx={{ minWidth: 200, textAlign: 'center' }}>
            {monthNames[month]} {year}
          </Typography>
          <IconButton 
            onClick={() => navigateMonth('next')}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { 
                backgroundColor: 'grey.100',
                color: 'text.primary'
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
        
        <IconButton 
          onClick={goToToday}
          sx={{ 
            color: 'primary.main',
            backgroundColor: 'primary.light',
            '&:hover': { 
              backgroundColor: 'primary.main',
              color: 'white'
            }
          }}
        >
          <CalendarToday />
        </IconButton>
      </Box>
      
      {/* Días de la semana */}
      <Grid container spacing={0} sx={{ mb: 2 }}>
        {dayNames.map((day) => (
          <Grid item xs key={day}>
            <Box sx={{ 
              textAlign: 'center', 
              py: 2,
              backgroundColor: 'grey.50',
              borderRadius: 1,
              mx: 0.5
            }}>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                {day}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      {/* Grid de días */}
      <Grid container spacing={0}>
        {days.map((dayObj, index) => {
          const isCurrentDay = isToday(dayObj.date)
          const isSelectedDay = isSelected(dayObj.date)
          
          return (
            <Grid item xs key={index}>
              <Box
                onClick={() => onDateClick?.(dayObj.date)}
                sx={{
                  height: 60, // Volver al tamaño anterior
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: 2,
                  mx: 0.5,
                  mb: 1,
                  backgroundColor: isSelectedDay 
                    ? 'primary.main' 
                    : isCurrentDay 
                      ? 'primary.light' 
                      : 'transparent',
                  color: isSelectedDay 
                    ? 'white' 
                    : !dayObj.isCurrentMonth 
                      ? 'text.disabled'
                      : isCurrentDay 
                        ? 'primary.main'
                        : 'text.primary',
                  fontWeight: isCurrentDay ? 700 : 500,
                  fontSize: '1rem', // Texto normal
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isSelectedDay 
                      ? 'primary.dark' 
                      : isCurrentDay
                        ? 'primary.main'
                        : 'grey.100',
                    color: isSelectedDay 
                      ? 'white'
                      : isCurrentDay
                        ? 'white'
                        : 'text.primary',
                    transform: 'scale(1.05)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Typography variant="h6" fontWeight="inherit">
                  {dayObj.day}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Paper>
  )
}
