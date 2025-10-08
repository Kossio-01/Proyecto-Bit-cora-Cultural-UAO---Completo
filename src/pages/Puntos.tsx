import { Paper, Stack, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useRewards } from '../store/rewards'

export default function Puntos() {
  const r = useRewards()
  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
        <EmojiEventsIcon color="error" sx={{ fontSize: 40 }} />
        <Typography variant="h4" color="error.main">{r.points}</Typography>
        <Typography variant="body2" color="text.secondary">Puntos Acumulados</Typography>
      </Paper>

      <Typography variant="subtitle1">Historial de Actividad</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <List dense>
          {r.history.map((h) => (
            <ListItem key={h.id}>
              <ListItemIcon>
                <CheckCircleIcon color={h.type === 'purchase' ? 'error' : 'primary'} />
              </ListItemIcon>
              <ListItemText
                primary={h.label}
                secondary={`${h.type === 'purchase' ? '' : '+'}${h.amount} ${h.type === 'purchase' ? 'pts' : 'pts'}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="caption" color="text.secondary">Gana puntos compartiendo eventos y asistiendo a ellos.</Typography>
      </Paper>
    </Stack>
  )
}

