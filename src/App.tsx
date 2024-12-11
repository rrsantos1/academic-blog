import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import ProtectedRoute from './components/ProtectedRoute';
import Posts from './posts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;