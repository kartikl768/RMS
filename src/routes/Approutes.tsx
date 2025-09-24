import CreateJob from "../pages/ManagerPages/CreateJob";
import ManagerDashboard from "../pages/ManagerPages/ManagerDashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EditJob from "../pages/ManagerPages/EditJob";
import Upcoming from "../pages/InterviewerPages/Upcoming";
import Completed from "../pages/InterviewerPages/Completed";


export default function Approutes() {
  return (
    <>
        <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ManagerDashboard />} />
          <Route path="/create" element={<CreateJob />} />
          <Route path="/edit/:jobId" element={<EditJob />} /> */}
          <Route path="/" element={<Navigate to="/upcoming" />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/completed" element={<Completed />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}
