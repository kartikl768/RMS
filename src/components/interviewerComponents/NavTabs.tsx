import { NavLink } from "react-router-dom";
import "../../assets/stlyes/interviewerStyles/navTabs.css";

const NavTabs = () => {
  return (
    <div className="dashboard-nav">
      <div className="container">
        <div className="nav-tabs">
          <NavLink
            to="/upcoming"
            className={({ isActive }) =>
              `nav-tab ${isActive ? "active" : ""}`
            }
          >
            Upcoming Interviews
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              `nav-tab ${isActive ? "active" : ""}`
            }
          >
            Completed Interviews
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavTabs;
