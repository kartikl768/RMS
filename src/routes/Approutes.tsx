import CreateJob from "../pages/ManagerPages/CreateJob";
import ManagerDashboard from "../pages/ManagerPages/ManagerDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditJob from "../pages/ManagerPages/EditJob";


export default function Approutes() {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<ManagerDashboard />} />
          <Route path="/create" element={<CreateJob />} />
          <Route path="/edit/:jobId" element={<EditJob />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}
