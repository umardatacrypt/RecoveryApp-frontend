import "./App.css";
import HomePage from "./pages/Home";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { isLoggedIn } from "./utils/jwtHelper";
import { ProtectedRoute } from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>Home Page</>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:bucode"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
