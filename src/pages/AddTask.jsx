import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AppHeader from '../components/AppHeader'
import { useTasks } from '../hooks/useTasks.jsx'

const AddTask = () => {
  const navigate = useNavigate()
  const { addTask } = useTasks()
  const [form, setForm] = useState({ title: '', description: '', type: '' })
  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' })
  const [redirectAfterSuccess, setRedirectAfterSuccess] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
    if (snackbar.severity === 'success' && redirectAfterSuccess) {
      setRedirectAfterSuccess(false)
      navigate('/tasks', { replace: true })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Requerido'
    if (!form.description.trim()) newErrors.description = 'Requerido'
    if (!form.type) newErrors.type = 'Selecciona un tipo'

    setErrors(newErrors)

    if (Object.keys(newErrors).length) {
      setSnackbar({
        open: true,
        message: 'Completa todos los campos obligatorios',
        severity: 'error',
      })
      return
    }

    addTask(form)
    setSnackbar({
      open: true,
      message: 'Tarea guardada',
      severity: 'success',
    })
    setRedirectAfterSuccess(true)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
      <AppHeader title="Agregar tarea" showBack />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1.75, sm: 2 },
          mt: { xs: 0.5, sm: 0 },
        }}
      >
        <TextField
          label="Título"
          value={form.title}
          onChange={handleChange('title')}
          required
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Descripción"
          value={form.description}
          onChange={handleChange('description')}
          required
          error={!!errors.description}
          helperText={errors.description}
          multiline
          minRows={3}
        />
        <FormControl required error={!!errors.type}>
          <InputLabel id="task-type-label">Tipo</InputLabel>
          <Select
            labelId="task-type-label"
            label="Tipo"
            value={form.type}
            onChange={handleChange('type')}
          >
            <MenuItem value="trabajo">Trabajo</MenuItem>
            <MenuItem value="casa">Casa</MenuItem>
            <MenuItem value="negocios">Negocios</MenuItem>
          </Select>
          <FormHelperText>{errors.type}</FormHelperText>
        </FormControl>
        <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
          <Button type="submit" fullWidth sx={{ minHeight: 48 }}>
            Guardar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/tasks')}
            sx={{ minHeight: 48 }}
          >
            Cancelar
          </Button>
        </Stack>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AddTask
