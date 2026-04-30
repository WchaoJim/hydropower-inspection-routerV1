import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { RobotInspection } from './pages/RobotInspection';
import { DroneInspection } from './pages/DroneInspection';
import { Alarms } from './pages/Alarms';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { SystemHealth } from './pages/SystemHealth';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="robot" element={<RobotInspection />} />
          <Route path="drone" element={<DroneInspection />} />
          <Route path="alarms" element={<Alarms />} />
          <Route path="reports" element={<Reports />} />
          <Route path="health" element={<SystemHealth />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
