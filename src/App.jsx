import { Routes, Route, Navigate } from 'react-router-dom'
import LevelDashboard from './pages/LevelDashboard/LevelDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/Lvl-Dashboard" element={<LevelDashboard />} />
      <Route path="*" element={<Navigate to="/Lvl-Dashboard" replace />} />
    </Routes>
  )
}