import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import Login from './features/auth/Login';
import AdminPanel from './pages/AdminPanel';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tools/:id" element={<ToolPage />} />
          <Route path="login" element={<Login />} />
          {/* עמודים רק לאחר התחברות */}
          <Route element={<PersistLogin />} >
            <Route element={<RequireAuth allowRoles={["admin"]} />}>
              <Route path="admin" element={<AdminPanel />} />
            </Route>
            {/* אפשרות להוסיף בעתיד עמוד למשתמש רגיל */}
            {/* <Route element={<RequireAuth allowRoles={['user']} />}>
              <Route path="profile" element={<UserProfile />} />
            </Route> */}
          </Route>
          <Route path="*" element={<p>404 - עמוד לא נמצא</p>} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
