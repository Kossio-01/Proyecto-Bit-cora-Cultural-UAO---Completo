import { Paper, Stack, Typography, Chip, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useRewards } from '../store/rewards'

export default function Puntos() {
  const r = useRewards()
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        <Chip label="Puntos Acumulados" color="primary" size="small" />
        <Chip label="Recompensas" variant="outlined" size="small" />
      </Stack>

      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
        <EmojiEventsIcon color="error" sx={{ fontSize: 40 }} />
        <Typography variant="h4" color="error.main">{r.points}</Typography>
        <Typography variant="body2" color="text.secondary">Puntos</Typography>
      </Paper>

      <Typography variant="subtitle1">Detalles</Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Recompensas</Typography>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', mb: 2 }}>
          <Typography variant="h5">{r.cashEarned.toLocaleString('es-CO')}</Typography>
          <Typography variant="caption" color="text.secondary">Pesos</Typography>
        </Paper>
        <List dense>
          {r.history.map((h) => (
            <ListItem key={h.id}>
              <ListItemIcon>
                <CheckCircleIcon color={h.type === 'cash' ? 'success' : 'primary'} />
              </ListItemIcon>
              <ListItemText
                primary={h.label}
                secondary={`${h.type === 'cash' ? '$' : '+'}${h.amount} ${h.type === 'cash' ? 'COP' : 'pts'}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="caption" color="text.secondary">Gana puntos asistiendo y participando en eventos.</Typography>
      </Paper>
    </Stack>
  )
}

