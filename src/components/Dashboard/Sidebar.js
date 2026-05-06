import React, { useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import SouthWestRoundedIcon from "@mui/icons-material/SouthWestRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import Logo from "../../assets/logo.gif";

const NavButton = ({ icon, label, onClick, className = "nav-item", tone = "default" }) => (
  <button className={className} onClick={onClick} type="button">
    <span className={`icon icon-${tone}`} aria-hidden="true">
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
        icon={<BiotechRoundedIcon fontSize="small" />}
        label="Lab"
        tone="lab"
        onClick={() => setIsLabDropdownOpen((prev) => !prev)}
      />
      {isLabDropdownOpen && (
        <div className="submenu">
          <NavButton
            className="nav-item submenu-item"
            icon={<BiotechRoundedIcon fontSize="small" />}
            label="Lab Dashboard"
            tone="lab"
            onClick={() => handleNavigation("lab")}
          />
          <NavButton
            className="nav-item submenu-item"
            icon={<EngineeringRoundedIcon fontSize="small" />}
            label="Lab Assigned"
            tone="lab"
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
          tone="dashboard"
          onClick={() => handleNavigation("isb-rwp-complaints")}
        />
      );
    }

    return (
      <>
        <NavButton
          icon={<HomeRoundedIcon fontSize="small" />}
          label="Dashboard"
          tone="dashboard"
          onClick={() => handleNavigation("dashboard")}
        />
        <NavButton
          icon={<AddRoundedIcon fontSize="small" />}
          label="Register New Complaint"
          tone="register"
          onClick={() => handleNavigation("new-complaint")}
        />
        <NavButton
          icon={<CalendarMonthRoundedIcon fontSize="small" />}
          label="Scheduler"
          tone="scheduler"
          onClick={() => handleNavigation("scheduler")}
        />
        <NavButton
          icon={<DesktopWindowsRoundedIcon fontSize="small" />}
          label="Courier Tracking"
          tone="courier"
          onClick={() => setIsCourierTrackingOpen((prev) => !prev)}
        />
        {isCourierTrackingOpen && (
          <div className="submenu">
            <NavButton
              className="nav-item submenu-item"
              icon={<SouthWestRoundedIcon fontSize="small" />}
              label="Incoming Hardware"
              tone="courier"
              onClick={() => handleNavigation("incoming-hardware")}
            />
            <NavButton
              className="nav-item submenu-item"
              icon={<NorthEastRoundedIcon fontSize="small" />}
              label="Outgoing Hardware"
              tone="courier"
              onClick={() => handleNavigation("outgoing-hardware")}
            />
          </div>
        )}
        {renderLabMenu()}
        <NavButton
          icon={<BarChartRoundedIcon fontSize="small" />}
          label="Metrics"
          tone="metrics"
          onClick={() => setIsMetricsDropdownOpen((prev) => !prev)}
        />
        {isMetricsDropdownOpen && (
          <div className="submenu">
            <NavButton
              className="nav-item submenu-item"
              icon={<TodayRoundedIcon fontSize="small" />}
              label="Today's Metrics"
              tone="metrics"
              onClick={() => handleNavigation("todays-metrics")}
            />
            <NavButton
              className="nav-item submenu-item"
              icon={<AssessmentRoundedIcon fontSize="small" />}
              label="Overall Metrics"
              tone="metrics"
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
          tone="logout"
          onClick={handleLogout}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
