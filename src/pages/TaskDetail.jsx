import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AppHeader from '../components/AppHeader'
import { useTasks } from '../hooks/useTasks.jsx'

const typeColorMap = {
  trabajo: 'primary',
  casa: 'secondary',
  negocios: 'success',
}

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTaskById, toggleCompleted, deleteTask } = useTasks()
  const [openDialog, setOpenDialog] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const task = getTaskById(id)

  const formattedDate = useMemo(() => {
    if (!task) return ''
    return new Date(task.createdAt).toLocaleString()
  }, [task])

  const handleToggle = () => {
    if (!task) return
    toggleCompleted(task.id)
    setSnackbar({
      open: true,
      message: task.completed ? 'Marcada como pendiente' : 'Marcada como completada',
      severity: 'info',
    })
  }

  const handleConfirmDelete = () => {
    if (!task) return
    const taskId = task.id
    setOpenDialog(false)
    deleteTask(taskId)
    navigate('/tasks', { replace: true })
  }

  if (!task) {
    return (
      <Box>
        <AppHeader title="Detalle" showBack />
        <Stack spacing={2} sx={{ py: 4 }}>
          <Typography variant="h6">No encontramos la tarea.</Typography>
          <Button onClick={() => navigate('/tasks')}>Volver a la lista</Button>
        </Stack>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
      <AppHeader title="Detalle de tarea" showBack />
      <Stack spacing={{ xs: 2, sm: 3 }} sx={{ mt: { xs: 0.5, sm: 0 } }}>
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {task.title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={task.type}
              color={typeColorMap[task.type] || 'default'}
              size="small"
            />
            <Chip
              label={task.completed ? 'Completada' : 'Pendiente'}
              color={task.completed ? 'success' : 'warning'}
              size="small"
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Creada: {formattedDate}
          </Typography>
        </Stack>
        <Typography variant="body1">{task.description}</Typography>
        <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
          <Button fullWidth onClick={handleToggle} sx={{ minHeight: 48 }}>
            {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => setOpenDialog(true)}
            sx={{ minHeight: 48 }}
          >
            Eliminar
          </Button>
        </Stack>
        <Button variant="text" onClick={() => navigate('/tasks')} sx={{ alignSelf: 'flex-start' }}>
          Volver a la lista
        </Button>
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Eliminar tarea</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que quieres eliminar esta tarea? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setOpenDialog(false)}>
            Cancelar
          </Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2200}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default TaskDetail
