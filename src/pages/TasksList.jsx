import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import AppHeader from '../components/AppHeader'
import TaskItem from '../components/TaskItem'
import { useTasks } from '../hooks/useTasks.jsx'

const VALID_FILTERS = ['pending', 'completed', 'all']

const filterTasks = (tasks, filter) => {
  if (filter === 'pending') return tasks.filter((task) => !task.completed)
  if (filter === 'completed') return tasks.filter((task) => task.completed)
  return tasks
}

const TasksList = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { tasks, toggleCompleted, deleteTask } = useTasks()
  const initialFilter = (() => {
    const query = searchParams.get('filter')
    return VALID_FILTERS.includes(query) ? query : 'pending'
  })()
  const [filter, setFilter] = useState(initialFilter)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const theme = useTheme()

  const filteredTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter])

  useEffect(() => {
    const query = searchParams.get('filter')
    if (query && VALID_FILTERS.includes(query) && query !== filter) {
      setFilter(query)
    }
  }, [searchParams, filter])

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id)
      setSnackbar({ open: true, message: 'Tarea eliminada', severity: 'info' })
      setTaskToDelete(null)
    }
  }

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }))

  const handleChangeFilter = (_, value) => {
    setFilter(value)
    setSearchParams({ filter: value }, { replace: true })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
      <AppHeader title="Mis tareas" showBack />
      <Stack spacing={{ xs: 2, sm: 2.5 }}>
        <Tabs
          value={filter}
          onChange={handleChangeFilter}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            borderRadius: theme.shape.borderRadius,
            px: { xs: 0.5, sm: 1 },
          }}
        >
          <Tab value="pending" label="Pendientes" />
          <Tab value="completed" label="Completadas" />
          <Tab value="all" label="Todas" />
        </Tabs>
        <Divider />
        {filteredTasks.length ? (
          <Paper
            sx={{
              width: '100%',
              mx: 0,
              borderRadius: 0,
              overflow: 'hidden',
              px: { xs: 0.5, sm: 1 },
              py: { xs: 0.5, sm: 1 },
            }}
          >
            <List disablePadding>
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleCompleted}
                  onDelete={setTaskToDelete}
                  onSelect={(id) => navigate(`/tasks/${id}`)}
                />
              ))}
            </List>
          </Paper>
        ) : (
          <Stack spacing={2} alignItems="center" sx={{ py: { xs: 3, sm: 4 } }}>
            <Typography variant="subtitle1">No hay tareas en este filtro.</Typography>
            <Button onClick={() => navigate('/add')}>Agregar tarea</Button>
          </Stack>
        )}
      </Stack>

      <Dialog open={!!taskToDelete} onClose={() => setTaskToDelete(null)}>
        <DialogTitle>Eliminar tarea</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que quieres eliminar &quot;{taskToDelete?.title}&quot;?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setTaskToDelete(null)}>
            Cancelar
          </Button>
          <Button color="error" onClick={handleDeleteConfirm}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default TasksList
