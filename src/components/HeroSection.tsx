import { useState, useEffect } from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { fetchEvents, type EventItem } from '../services/events'
import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextEventIndex, setNextEventIndex] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [gradientIndex, setGradientIndex] = useState(0) // Para alternar gradientes
  const navigate = useNavigate()

  // Gradientes dinámicos
  const gradients = [
    // Gradiente UAO Clásico
    {
      start: 'linear-gradient(135deg, #e30613 0%, #b71c1c 50%, #8e0000 100%)',
      mid1: 'linear-gradient(135deg, #ff5722 0%, #e30613 50%, #b71c1c 100%)',
      peak: 'linear-gradient(135deg, #ff9800 0%, #ff5722 50%, #e30613 100%)',
      mid2: 'linear-gradient(135deg, #ff5722 0%, #e30613 50%, #b71c1c 100%)',
      end: 'linear-gradient(135deg, #e30613 0%, #b71c1c 50%, #8e0000 100%)'
    },
    // Gradiente Azul Profundo
    {
      start: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
      mid1: 'linear-gradient(135deg, #2196f3 0%, #1976d2 50%, #1565c0 100%)',
      peak: 'linear-gradient(135deg, #03a9f4 0%, #2196f3 50%, #1976d2 100%)',
      mid2: 'linear-gradient(135deg, #2196f3 0%, #1976d2 50%, #1565c0 100%)',
      end: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)'
    },
    // Gradiente Verde Esmeralda
    {
      start: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 50%, #0d4f1c 100%)',
      mid1: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 50%, #1b5e20 100%)',
      peak: 'linear-gradient(135deg, #8bc34a 0%, #4caf50 50%, #2e7d32 100%)',
      mid2: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 50%, #1b5e20 100%)',
      end: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 50%, #0d4f1c 100%)'
    },
    // Gradiente Púrpura Real
    {
      start: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 50%, #4a148c 100%)',
      mid1: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 50%, #6a1b9a 100%)',
      peak: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #7b1fa2 100%)',
      mid2: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 50%, #6a1b9a 100%)',
      end: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 50%, #4a148c 100%)'
    },
    // Gradiente Dorado
    {
      start: 'linear-gradient(135deg, #f57c00 0%, #ef6c00 50%, #e65100 100%)',
      mid1: 'linear-gradient(135deg, #ff9800 0%, #f57c00 50%, #ef6c00 100%)',
      peak: 'linear-gradient(135deg, #ffc107 0%, #ff9800 50%, #f57c00 100%)',
      mid2: 'linear-gradient(135deg, #ff9800 0%, #f57c00 50%, #ef6c00 100%)',
      end: 'linear-gradient(135deg, #f57c00 0%, #ef6c00 50%, #e65100 100%)'
    }
  ]

  useEffect(() => {
    fetchEvents().then((allEvents) => {
      // Filtrar solo los eventos más importantes/populares
      const importantEvents = allEvents.filter(event => 
        event.titulo.includes('Jhonny Rivera') ||
        event.titulo.includes('Alejandro Fernández') ||
        event.titulo.includes('Festival Internacional de Cine') ||
        event.titulo.includes('ATP Cali Open') ||
        event.titulo.includes('Eladio Carrión')
      )
      setEvents(importantEvents)
    })
  }, [])

  // Mostrar el componente después de que se carguen los eventos
  useEffect(() => {
    if (events.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [events.length])

  useEffect(() => {
    if (events.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = (currentEventIndex + 1) % events.length
        setNextEventIndex(nextIndex)
        setIsTransitioning(true)
        
        // Cambiar el evento en el punto medio de la animación (1 segundo)
        setTimeout(() => {
          setCurrentEventIndex(nextIndex)
          // Cambiar gradiente aleatoriamente
          setGradientIndex(Math.floor(Math.random() * gradients.length))
          // Terminar la transición después de que la animación completa termine
          setTimeout(() => {
            setIsTransitioning(false)
          }, 1000) // Duración restante de la animación
        }, 1000) // Punto medio de la animación (1s de 2s total)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [events, currentEventIndex])

  const handleVerDetalles = () => {
    const currentEvent = events[currentEventIndex]
    if (currentEvent) {
      navigate(`/eventos/${currentEvent.id}`)
    }
  }

  if (events.length === 0) {
    return (
      <Paper
        sx={{
          height: { xs: 250, md: 350 },
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.200',
          mb: 4,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Cargando eventos...
        </Typography>
      </Paper>
    )
  }

  const currentEvent = events[currentEventIndex]

  return (
    <Paper
      sx={{
        position: 'relative',
        height: { xs: 250, md: 350 },
        borderRadius: 2,
        overflow: 'hidden',
        mb: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: 'grey.900',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Content Section (Diagonal Gradient) */}
          <Box
            sx={{
              position: 'relative',
              flex: { xs: '1 1 auto', md: '0 0 50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              color: 'white',
              p: { xs: 3, md: 6 },
              zIndex: 2,
              background: 'linear-gradient(135deg, #e30613 0%, #b71c1c 100%)',
            }}
          >
            <Typography 
              variant="overline" 
              sx={{ 
                mb: 1, 
                opacity: 0.8,
                animation: 'textGlow 4s ease-in-out infinite',
                '@keyframes textGlow': {
                  '0%, 100%': {
                    opacity: 0.8,
                    textShadow: '0 0 5px rgba(255,255,255,0.3)'
                  },
                  '50%': {
                    opacity: 1,
                    textShadow: '0 0 10px rgba(255,255,255,0.6)'
                  }
                }
              }}
            >
              Evento Destacado
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                mb: 1.5,
                animation: 'titleFloat 6s ease-in-out infinite',
                '@keyframes titleFloat': {
                  '0%, 100%': {
                    transform: 'translateY(0px)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  },
                  '50%': {
                    transform: 'translateY(-2px)',
                    textShadow: '0 4px 8px rgba(0,0,0,0.4)'
                  }
                }
              }}
            >
              {currentEvent.titulo}
            </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 2, 
            opacity: 0.9,
          }}
        >
          {new Date(currentEvent.fecha).toLocaleDateString('es-CO', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
          })} • {new Date(currentEvent.fecha).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 3, 
            opacity: 0.8,
          }}
        >
          {currentEvent.lugar}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleVerDetalles}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            color: 'primary.main',
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'grey.200',
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          Ver Detalles
        </Button>
      </Box>

      {/* Image Section con Circle Reveal Effect */}
          <Box
            sx={{
              position: 'relative',
              flex: { xs: '1 1 auto', md: '0 0 50%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              zIndex: 1,
              minHeight: '100%',
              width: '100%',
            }}
          >
        {/* Imagen actual */}
        {currentEvent.imagen && (
          <Box
            component="img"
            src={currentEvent.imagen}
            alt={currentEvent.titulo}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              animation: 'imageFloat 12s ease-in-out infinite',
              '@keyframes imageFloat': {
                '0%, 100%': {
                  transform: 'scale(1) rotate(0deg) translateY(0px)',
                  filter: 'brightness(1) contrast(1)'
                },
                '25%': {
                  transform: 'scale(1.02) rotate(0.5deg) translateY(-2px)',
                  filter: 'brightness(1.05) contrast(1.02)'
                },
                '50%': {
                  transform: 'scale(1.01) rotate(-0.3deg) translateY(1px)',
                  filter: 'brightness(1.02) contrast(1.01)'
                },
                '75%': {
                  transform: 'scale(1.03) rotate(0.2deg) translateY(-1px)',
                  filter: 'brightness(1.08) contrast(1.03)'
                }
              },
              '&:hover': {
                transform: 'scale(1.05)',
                filter: 'brightness(1.1)',
                animation: 'none', // Pausa la animación en hover
              },
              transition: 'transform 0.3s ease-out, filter 0.3s ease-out',
            }}
          />
        )}

        {/* Imagen siguiente con Circle Reveal */}
        {isTransitioning && events[nextEventIndex]?.imagen && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${events[nextEventIndex].imagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                clipPath: 'circle(0% at 100% 0%)',
                animation: 'circleReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                '@keyframes circleReveal': {
                  '0%': {
                    clipPath: 'circle(0% at 100% 0%)'
                  },
                  '100%': {
                    clipPath: 'circle(150% at 100% 0%)'
                  }
                }
              }
            }}
          />
        )}

        {/* Overlay sutil */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.1)',
            zIndex: 1,
          }}
        />
      </Box>

      {/* Circle Reveal Overlay */}
      {isTransitioning && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: gradients[gradientIndex].start,
            zIndex: 15,
            clipPath: 'circle(0% at 100% 0%)',
            animation: 'circleRevealFull 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            '@keyframes circleRevealFull': {
              '0%': {
                clipPath: 'circle(0% at 100% 0%)',
                background: gradients[gradientIndex].start
              },
              '25%': {
                clipPath: 'circle(75% at 100% 0%)',
                background: gradients[gradientIndex].mid1
              },
              '50%': {
                clipPath: 'circle(150% at 100% 0%)',
                background: gradients[gradientIndex].peak
              },
              '75%': {
                clipPath: 'circle(75% at 100% 0%)',
                background: gradients[gradientIndex].mid2
              },
              '100%': {
                clipPath: 'circle(0% at 100% 0%)',
                background: gradients[gradientIndex].end
              }
            }
          }}
        />
      )}

      {/* Floating Particles Animation */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Particle 1 */}
        <Box
          sx={{
            position: 'absolute',
            width: 4,
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '50%',
            top: '20%',
            left: '10%',
            animation: 'float1 8s ease-in-out infinite',
            '@keyframes float1': {
              '0%, 100%': {
                transform: 'translateY(0px) translateX(0px)',
                opacity: 0.3
              },
              '25%': {
                transform: 'translateY(-20px) translateX(10px)',
                opacity: 0.8
              },
              '50%': {
                transform: 'translateY(-10px) translateX(20px)',
                opacity: 0.5
              },
              '75%': {
                transform: 'translateY(-30px) translateX(5px)',
                opacity: 0.7
              }
            }
          }}
        />
        {/* Particle 2 */}
        <Box
          sx={{
            position: 'absolute',
            width: 3,
            height: 3,
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: '50%',
            top: '60%',
            right: '15%',
            animation: 'float2 6s ease-in-out infinite 1s',
            '@keyframes float2': {
              '0%, 100%': {
                transform: 'translateY(0px) translateX(0px)',
                opacity: 0.4
              },
              '33%': {
                transform: 'translateY(-15px) translateX(-10px)',
                opacity: 0.9
              },
              '66%': {
                transform: 'translateY(-25px) translateX(5px)',
                opacity: 0.6
              }
            }
          }}
        />
        {/* Particle 3 */}
        <Box
          sx={{
            position: 'absolute',
            width: 2,
            height: 2,
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: '50%',
            bottom: '30%',
            left: '20%',
            animation: 'float3 7s ease-in-out infinite 2s',
            '@keyframes float3': {
              '0%, 100%': {
                transform: 'translateY(0px) translateX(0px)',
                opacity: 0.5
              },
              '40%': {
                transform: 'translateY(-18px) translateX(12px)',
                opacity: 0.8
              },
              '80%': {
                transform: 'translateY(-8px) translateX(-8px)',
                opacity: 0.6
              }
            }
          }}
        />
      </Box>

    </Paper>
  )
}