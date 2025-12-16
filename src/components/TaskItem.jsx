import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { alpha, useTheme } from '@mui/material/styles'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

const TaskItem = ({ task, onToggle, onDelete, onSelect }) => {
  const theme = useTheme()

  const handleToggle = (event) => {
    event.stopPropagation()
    onToggle(task.id)
  }

  const handleDelete = (event) => {
    event.stopPropagation()
    onDelete(task)
  }

  const handleSelect = () => {
    onSelect(task.id)
  }

  const typeColor = (() => {
    const map = {
      trabajo: theme.palette.primary.main,
      casa: theme.palette.secondary.main,
      negocios: theme.palette.info.main,
    }
    return map[task.type] || theme.palette.primary.main
  })()

  const statusChip = task.completed
    ? {
        label: 'Completada',
        bg: alpha(theme.palette.primary.main, 0.12),
        color: theme.palette.primary.dark,
        border: alpha(theme.palette.primary.main, 0.3),
      }
    : {
        label: 'Pendiente',
        bg: alpha(theme.palette.text.secondary, 0.08),
        color: theme.palette.text.secondary,
        border: alpha(theme.palette.text.secondary, 0.15),
      }

  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ minWidth: 96, justifyContent: 'flex-end' }}
        >
          <Tooltip title={task.completed ? 'Marcar pendiente' : 'Marcar completa'}>
            <IconButton edge="end" onClick={handleToggle} color="primary">
              {task.completed ? (
                <CheckCircleRoundedIcon />
              ) : (
                <RadioButtonUncheckedRoundedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton edge="end" onClick={handleDelete} color="error">
              <DeleteRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <ListItemButton
        onClick={handleSelect}
        sx={{
          py: 1.5,
          borderRadius: theme.shape.borderRadius,
          pr: 12,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
          },
        }}
      >
        <ListItemText
          primary={task.title}
          primaryTypographyProps={{
            fontWeight: 700,
            noWrap: true,
            sx: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
          secondary={
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                mt: 0.5,
                flexWrap: 'wrap',
                columnGap: 1,
                rowGap: 0.75,
              }}
            >
              <Chip
                size="small"
                label={task.type}
                sx={{
                  bgcolor: alpha(typeColor, 0.16),
                  color: typeColor,
                  border: `1px solid ${alpha(typeColor, 0.32)}`,
                }}
              />
                <Chip
                  size="small"
                  label={statusChip.label}
                  sx={{
                    bgcolor: statusChip.bg,
                    color: statusChip.color,
                    border: `1px solid ${statusChip.border}`,
                  }}
                />
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}

export default TaskItem
