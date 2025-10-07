import { useEffect, useMemo, useState } from 'react'
import { Stack, TextField, InputAdornment, Typography, Chip, Checkbox, FormControlLabel, Paper, Divider, Badge, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { fetchEvents, type EventItem } from '../services/events'
import { useNavigate } from 'react-router-dom'
import { useFilters } from '../store/filters'

type Day = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'

export default function Filtros() {
  const navigate = useNavigate()
  const filters = useFilters()
  const [query, setQuery] = useState('')
  const [events, setEvents] = useState<EventItem[]>([])
  const [selectedDays, setSelectedDays] = useState<Record<Day, boolean>>({
    Lunes: false,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  })

  useEffect(() => {
    fetchEvents().then(setEvents)
  }, [])

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const e of events) counts.set(e.categoria, (counts.get(e.categoria) ?? 0) + 1)
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }))
  }, [events])

  const days: Day[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  return (
    <Stack spacing={2}>
      <TextField
        size="small"
        placeholder="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
      />

      <Typography variant="caption" color="primary">CATEGORÍAS</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {categories.map((c) => (
          <Badge key={c.name} badgeContent={c.count} color="default">
            <Chip label={c.name} variant={filters.categories.includes(c.name) ? 'filled' : 'outlined'} onClick={() => filters.toggleCategory(c.name)} />
          </Badge>
        ))}
      </Stack>

      <Paper variant="outlined" sx={{ p: 1 }}>
        <Typography variant="caption" color="primary">DÍAS DE LA SEMANA</Typography>
        <Divider sx={{ my: 1 }} />
        <Stack>
          {days.map((d) => (
            <FormControlLabel
              key={d}
              control={<Checkbox checked={selectedDays[d]} onChange={(_, v) => setSelectedDays((s) => ({ ...s, [d]: v }))} />}
              label={d}
            />
          ))}
        </Stack>
      </Paper>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            filters.setQuery(query)
            const selected = Object.entries(selectedDays).filter(([, v]) => v).map(([k]) => k)
            selected.forEach((d) => filters.toggleDay(d))
            navigate('/eventos')
          }}
        >
          Aplicar filtros
        </Button>
        <Button variant="text" onClick={() => { setQuery(''); setSelectedDays({ Lunes:false, Martes:false, Miércoles:false, Jueves:false, Viernes:false, Sábado:false, Domingo:false }); filters.reset() }}>Limpiar</Button>
        <Typography sx={{ ml: 'auto' }} variant="body2" color="text.secondary">{events.length} resultados</Typography>
      </Stack>
    </Stack>
  )
}

