import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { alpha, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const AppHeader = ({ title, showBack = false, showHome = true, action }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const handleBack = () => {
    const canGoBack =
      typeof window !== 'undefined' && window.history && window.history.state?.idx > 0
    if (canGoBack) {
      navigate(-1)
    } else {
      navigate('/tasks')
    }
  }

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        mb: { xs: 1.5, sm: 2 },
        borderRadius: theme.shape.borderRadius * 1.1,
        px: { xs: 1, sm: 1.5 },
        py: 0.5,
        mt: 1,
        pt: 'env(safe-area-inset-top)',
        backgroundColor: alpha(theme.palette.background.paper, 0.82),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: `0 16px 36px -28px ${alpha(theme.palette.primary.main, 0.55)}`,
        backdropFilter: 'blur(14px)',
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: 56, gap: 1 }}>
        {showBack && (
          <IconButton edge="start" onClick={handleBack} aria-label="volver" color="inherit">
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {title}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          {action}
          {showHome && (
            <IconButton
              color="inherit"
              aria-label="Ir a inicio"
              onClick={() => navigate('/')}
              sx={{ minWidth: 44, minHeight: 44 }}
            >
              <HomeRoundedIcon />
            </IconButton>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
