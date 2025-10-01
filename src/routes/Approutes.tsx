import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateJob from "../pages/ManagerPages/CreateJob";
import ManagerDashboard from "../pages/ManagerPages/ManagerDashboard";
import EditJob from "../pages/ManagerPages/EditJob";
import Upcoming from "../pages/InterviewerPages/Upcoming";
import Completed from "../pages/InterviewerPages/Completed";
import Login from "../pages/login"; // Make sure this path is correct
import PrivateRoute from "../utils/PrivateRoute";

export default function Approutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ManagerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:jobId"
          element={
            <PrivateRoute>
              <EditJob />
            </PrivateRoute>
          }
        />

        {/* Interviewer Routes */}
        <Route
          path="/upcoming"
          element={
            <PrivateRoute>
              <Upcoming />
            </PrivateRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <PrivateRoute>
              <Completed />
            </PrivateRoute>
          }
        />

        {/* Default and Fallback Routes */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
