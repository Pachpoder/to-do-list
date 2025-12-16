import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha, lighten, useTheme } from '@mui/material/styles'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AppHeader from '../components/AppHeader'
import { useTasks } from '../hooks/useTasks.jsx'

const StatCard = ({ label, value, tone, onClick }) => {
  const theme = useTheme()
  const main = theme.palette[tone]?.main || theme.palette.primary.main
  return (
    <Card
      sx={{
        color: theme.palette.text.primary,
        background: `linear-gradient(135deg, ${alpha(main, 0.12)}, ${alpha(
          lighten(main, 0.15),
          0.18,
        )})`,
        border: `1px solid ${alpha(main, 0.25)}`,
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          borderRadius: 'inherit',
          minHeight: 96,
          px: 1,
          py: 0.5,
        }}
      >
        <CardContent>
          <Typography variant="subtitle2" sx={{ opacity: 0.8, fontWeight: 700 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const Home = () => {
  const navigate = useNavigate()
  const {
    counts: { pending, completed },
  } = useTasks()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
      <AppHeader title="To-Do List" showHome={false} />
      <Stack spacing={{ xs: 2, sm: 3 }}>
        <Stack spacing={0.5}>
          <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 24 } }}>
            Organiza tu día con estilo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestiona pendientes, completa y revisa tu progreso. Todo queda guardado en tu
            dispositivo.
          </Typography>
        </Stack>
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
            gap: 1.5,
          }}
        >
          <StatCard
            label="Pendientes"
            value={pending}
            tone="primary"
            onClick={() => navigate('/tasks?filter=pending')}
          />
          <StatCard
            label="Completadas"
            value={completed}
            tone="secondary"
            onClick={() => navigate('/tasks?filter=completed')}
          />
        </Box>
        <Stack spacing={1.25} sx={{ mt: { xs: 0.5, sm: 0 } }}>
          <Button
            size="large"
            fullWidth
            startIcon={<VisibilityRoundedIcon />}
            onClick={() => navigate('/tasks')}
            sx={{ minHeight: 48 }}
          >
            Ver tareas
          </Button>
          <Button
            size="large"
            fullWidth
            variant="outlined"
            onClick={() => navigate('/add')}
            color="secondary"
            startIcon={<AddRoundedIcon />}
            sx={{ minHeight: 48 }}
          >
            Agregar tarea
          </Button>
        </Stack>
        <Card
          sx={{
            p: { xs: 2, sm: 2.5 },
            mt: { xs: 0.5, sm: 1 },
            textAlign: 'left',
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Tip rápido
          </Typography>
          <Typography variant="body2">
            Mantén tus tareas cortas y con verbo de acción. Marca lo terminado para ver tu avance
            al instante.
          </Typography>
        </Card>
      </Stack>
    </Box>
  )
}

export default Home
