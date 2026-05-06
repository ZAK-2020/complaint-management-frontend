import React, { useState } from "react";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import SouthWestRoundedIcon from "@mui/icons-material/SouthWestRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import Logo from "../../assets/logo.gif";

const NavButton = ({ icon, label, onClick, className = "nav-item" }) => (
  <button className={className} onClick={onClick} type="button">
    <span className="icon" aria-hidden="true">
      {icon}
    </span>
    <span>{label}</span>
  </button>
);

const Sidebar = ({ handleNavigation }) => {
  const [isCourierTrackingOpen, setIsCourierTrackingOpen] = useState(false);
  const [isMetricsDropdownOpen, setIsMetricsDropdownOpen] = useState(false);
  const [isLabDropdownOpen, setIsLabDropdownOpen] = useState(false);

  const username = localStorage.getItem("username") || "User";
  const userType = localStorage.getItem("userType");

  const handleLogout = async () => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.clear();
    window.location.href = "/login";
  };

  const renderLabMenu = () => (
    <>
      <NavButton
        icon={<ScienceRoundedIcon fontSize="small" />}
        label="Lab"
        onClick={() => setIsLabDropdownOpen((prev) => !prev)}
      />
      {isLabDropdownOpen && (
        <div className="submenu">
          <NavButton
            className="nav-item submenu-item"
            icon={<ScienceRoundedIcon fontSize="small" />}
            label="Lab Dashboard"
            onClick={() => handleNavigation("lab")}
          />
          <NavButton
            className="nav-item submenu-item"
            icon={<EngineeringRoundedIcon fontSize="small" />}
            label="Lab Assigned"
            onClick={() => handleNavigation("lab-assigned")}
          />
        </div>
      )}
    </>
  );

  const renderSidebarItems = () => {
    if (userType === "LAB_USER" && username !== "qamar") {
      return renderLabMenu();
    }

    if (userType === "OFFICE_USER" && username === "abdullah") {
      return (
        <NavButton
          icon={<BusinessRoundedIcon fontSize="small" />}
          label="ISB/RWP Complaints"
          onClick={() => handleNavigation("isb-rwp-complaints")}
        />
      );
    }

    return (
      <>
        <NavButton
          icon={<DashboardRoundedIcon fontSize="small" />}
          label="Dashboard"
          onClick={() => handleNavigation("dashboard")}
        />
        <NavButton
          icon={<AddCircleOutlineRoundedIcon fontSize="small" />}
          label="Register New Complaint"
          onClick={() => handleNavigation("new-complaint")}
        />
        <NavButton
          icon={<EventNoteRoundedIcon fontSize="small" />}
          label="Scheduler"
          onClick={() => handleNavigation("scheduler")}
        />
        <NavButton
          icon={<LocalShippingRoundedIcon fontSize="small" />}
          label="Courier Tracking"
          onClick={() => setIsCourierTrackingOpen((prev) => !prev)}
        />
        {isCourierTrackingOpen && (
          <div className="submenu">
            <NavButton
              className="nav-item submenu-item"
              icon={<SouthWestRoundedIcon fontSize="small" />}
              label="Incoming Hardware"
              onClick={() => handleNavigation("incoming-hardware")}
            />
            <NavButton
              className="nav-item submenu-item"
              icon={<NorthEastRoundedIcon fontSize="small" />}
              label="Outgoing Hardware"
              onClick={() => handleNavigation("outgoing-hardware")}
            />
          </div>
        )}
        {renderLabMenu()}
        <NavButton
          icon={<QueryStatsRoundedIcon fontSize="small" />}
          label="Metrics"
          onClick={() => setIsMetricsDropdownOpen((prev) => !prev)}
        />
        {isMetricsDropdownOpen && (
          <div className="submenu">
            <NavButton
              className="nav-item submenu-item"
              icon={<TodayRoundedIcon fontSize="small" />}
              label="Today's Metrics"
              onClick={() => handleNavigation("todays-metrics")}
            />
            <NavButton
              className="nav-item submenu-item"
              icon={<AssessmentRoundedIcon fontSize="small" />}
              label="Overall Metrics"
              onClick={() => handleNavigation("overall-metrics")}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <aside className="sidebar">
      <div className="user-info">
        <img src={Logo} alt="User" className="user-avatar" />
        <h3>User - {username}</h3>
      </div>
      <nav className="sidebar-nav">
        {renderSidebarItems()}
        <NavButton
          className="nav-item logout-button"
          icon={<LogoutRoundedIcon fontSize="small" />}
          label="Logout"
          onClick={handleLogout}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
