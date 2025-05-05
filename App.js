import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// Later you can import AdminDashboard, UserDashboard, StoreOwnerDashboard

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* You will add more dashboard routes later */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
