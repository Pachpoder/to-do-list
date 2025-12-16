import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Routes, Route } from 'react-router-dom'
import AddTask from './pages/AddTask'
import Home from './pages/Home'
import TaskDetail from './pages/TaskDetail'
import TasksList from './pages/TasksList'

const App = () => (
  <Container
    maxWidth="sm"
    sx={{
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3 },
      width: '100%',
      mx: 'auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      pb: { xs: 4, sm: 5 },
    }}
  >
    <Box flex={1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/tasks" element={<TasksList />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Box>
  </Container>
)

export default App
