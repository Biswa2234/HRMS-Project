
import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: "▦", path: "/dashboard" },
  { label: "Employees", icon: "♙", path: "/employees" },
  { label: "Departments", icon: "▤", path: "/departments" },
  { label: "Projects", icon: "▣", path: "/projects" },
  { label: "Tasks", icon: "☑", path: "/tasks" },
  { label: "Leave Management", icon: "▧", path: "/leaves" },
  { label: "Reports", icon: "▥", path: "/reports" },
];

const stats = [
  {
    title: "Total Employees",
    value: "248",
    change: "+12 this month",
    icon: "♙",
    color: "#e8efff",
    iconColor: "#4361ee",
  },
  {
    title: "Active Projects",
    value: "18",
    change: "12 in progress",
    icon: "▣",
    color: "#e1f8ed",
    iconColor: "#159765",
  },
  {
    title: "Pending Tasks",
    value: "36",
    change: "8 due today",
    icon: "☑",
    color: "#fff1dd",
    iconColor: "#d98212",
  },
  {
    title: "Pending Leaves",
    value: "07",
    change: "Awaiting approval",
    icon: "▧",
    color: "#f4e8ff",
    iconColor: "#9247d8",
  },
];

const activities = [
  {
    icon: "♙",
    color: "#e8efff",
    title: "New employee joined",
    detail: "Employee onboarding activity",
    time: "Today",
  },
  {
    icon: "☑",
    color: "#e1f8ed",
    title: "Task status updated",
    detail: "A project task was updated",
    time: "Today",
  },
  {
    icon: "▧",
    color: "#fff1dd",
    title: "Leave request submitted",
    detail: "A leave request needs review",
    time: "Yesterday",
  },
];

const leaveRequests = [
  {
    name: "Aarav Sharma",
    department: "Engineering",
    type: "Casual Leave",
    dates: "14 Oct - 15 Oct",
    initials: "AS",
    color: "#e8efff",
  },
  {
    name: "Priya Patel",
    department: "Human Resources",
    type: "Sick Leave",
    dates: "16 Oct - 16 Oct",
    initials: "PP",
    color: "#f4e8ff",
  },
  {
    name: "Rahul Kumar",
    department: "Design",
    type: "Casual Leave",
    dates: "17 Oct - 18 Oct",
    initials: "RK",
    color: "#e1f8ed",
  },
];

const chartData = [
  { day: "Mon", completed: 55, pending: 25 },
  { day: "Tue", completed: 75, pending: 35 },
  { day: "Wed", completed: 45, pending: 40 },
  { day: "Thu", completed: 90, pending: 25 },
  { day: "Fri", completed: 65, pending: 45 },
  { day: "Sat", completed: 35, pending: 20 },
  { day: "Sun", completed: 25, pending: 15 },
];

export default function Dashboard() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="hrms">
      <style>{`
        * { box-sizing: border-box; }

        .hrms {
          min-height: 100vh;
          background: #f5f7fb;
          color: #202b42;
          font-family: Inter, system-ui, -apple-system, sans-serif;
          font-size: 14px;
        }

        .hrms button, .hrms input { font: inherit; }
        .hrms button { cursor: pointer; }

        .hrms-shell {
          display: flex;
          min-height: 100vh;
        }

        .hrms-sidebar {
          width: 245px;
          flex-shrink: 0;
          background: #fff;
          border-right: 1px solid #e9edf4;
          padding: 27px 16px;
          display: flex;
          flex-direction: column;
        }

        .hrms-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 10px;
          margin-bottom: 38px;
        }

        .hrms-brand-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          background: #435cf5;
          color: white;
          border-radius: 12px;
          font-size: 23px;
          font-weight: 800;
        }

        .hrms-brand h2 {
          margin: 0;
          font-size: 21px;
          letter-spacing: -0.7px;
        }

        .hrms-brand small {
          color: #8993a6;
          font-size: 11px;
        }

        .hrms-section-label {
          color: #9ba4b5;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.3px;
          padding: 0 12px;
          margin: 8px 0 12px;
        }

        .hrms-menu {
          display: grid;
          gap: 6px;
        }

        .hrms-nav {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 12px 13px;
          border-radius: 9px;
          text-decoration: none;
          color: #68748a;
          font-weight: 550;
          transition: .2s;
        }

        .hrms-nav:hover { background: #f4f6ff; color: #435cf5; }

        .hrms-nav.active {
          background: #eef1ff;
          color: #435cf5;
          font-weight: 700;
        }

        .hrms-nav-icon {
          width: 23px;
          text-align: center;
          font-size: 20px;
        }

        .hrms-sidebar-bottom {
          margin-top: auto;
          padding-top: 25px;
        }

        .hrms-help {
          background: #f5f7ff;
          border: 1px solid #e9edff;
          border-radius: 12px;
          padding: 16px;
          margin: 18px 2px;
        }

        .hrms-help strong { font-size: 13px; }
        .hrms-help p {
          color: #7b879c;
          font-size: 12px;
          line-height: 1.6;
          margin: 8px 0 13px;
        }

        .hrms-help button {
          width: 100%;
          background: #435cf5;
          color: white;
          border: 0;
          border-radius: 7px;
          padding: 9px;
        }

        .hrms-main {
          flex: 1;
          min-width: 0;
        }

        .hrms-topbar {
          height: 82px;
          background: white;
          border-bottom: 1px solid #e9edf4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 0 32px;
        }

        .hrms-search {
          width: min(340px, 42vw);
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f7f8fc;
          border: 1px solid #edf0f5;
          border-radius: 9px;
          padding: 11px 13px;
          color: #8a94a7;
        }

        .hrms-search input {
          width: 100%;
          background: transparent;
          border: 0;
          outline: none;
          color: #202b42;
        }

        .hrms-top-actions {
          display: flex;
          align-items: center;
          gap: 19px;
        }

        .hrms-icon-btn {
          position: relative;
          background: transparent;
          border: 0;
          font-size: 21px;
          color: #657087;
        }

        .hrms-notification-dot {
          position: absolute;
          right: 0;
          top: 0;
          width: 7px;
          height: 7px;
          background: #f05c69;
          border: 1px solid white;
          border-radius: 50%;
        }

        .hrms-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hrms-avatar {
          width: 39px;
          height: 39px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #e5eaff;
          color: #435cf5;
          font-weight: 800;
        }

        .hrms-profile strong {
          display: block;
          font-size: 13px;
        }

        .hrms-profile small {
          display: block;
          color: #8993a6;
          margin-top: 3px;
          font-size: 11px;
        }

        .hrms-content {
          padding: 30px 32px;
          max-width: 1700px;
          margin: auto;
        }

        .hrms-page-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 26px;
        }

        .hrms-page-heading h1 {
          font-size: 27px;
          letter-spacing: -0.8px;
          margin: 0;
        }

        .hrms-page-heading p {
          color: #8a94a7;
          margin: 8px 0 0;
        }

        .hrms-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 0;
          border-radius: 8px;
          background: #435cf5;
          color: white;
          padding: 12px 16px;
          font-weight: 650;
          box-shadow: 0 4px 12px #435cf526;
        }

        .hrms-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 19px;
          margin-bottom: 24px;
        }

        .hrms-card {
          background: #fff;
          border: 1px solid #edf0f5;
          border-radius: 13px;
          box-shadow: 0 3px 14px #18264b05;
        }

        .hrms-stat {
          padding: 21px;
        }

        .hrms-stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .hrms-stat-title { color: #7c879b; font-weight: 550; }

        .hrms-stat-icon {
          display: grid;
          place-items: center;
          width: 43px;
          height: 43px;
          border-radius: 11px;
          font-size: 22px;
        }

        .hrms-stat-value {
          font-size: 29px;
          letter-spacing: -1px;
          font-weight: 750;
          margin: 16px 0 10px;
        }

        .hrms-stat-change { font-size: 12px; color: #7e8a9e; }
        .hrms-stat-change span { color: #159765; font-weight: 700; }

        .hrms-middle {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(280px, 1fr);
          gap: 22px;
          margin-bottom: 24px;
        }

        .hrms-panel { padding: 23px; min-width: 0; }

        .hrms-panel-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 22px;
        }

        .hrms-panel-heading h3 {
          font-size: 16px;
          margin: 0;
        }

        .hrms-panel-heading p {
          margin: 7px 0 0;
          font-size: 12px;
          color: #8b95a7;
        }

        .hrms-select {
          border: 1px solid #e6eaf1;
          border-radius: 7px;
          padding: 8px;
          background: #fff;
          color: #68748a;
          font-size: 12px;
        }

        .hrms-legend {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 19px;
          color: #7c879b;
          font-size: 11px;
        }

        .hrms-legend span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hrms-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 3px;
        }

        .hrms-chart {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 14px;
          height: 200px;
          padding-top: 6px;
          border-bottom: 1px solid #e9edf4;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 48px,
            #f0f2f7 49px,
            transparent 50px
          );
        }

        .hrms-chart-day {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          height: 100%;
          gap: 10px;
          min-width: 0;
        }

        .hrms-bars {
          height: 170px;
          display: flex;
          align-items: flex-end;
          gap: 4px;
          max-width: 36px;
          width: 100%;
        }

        .hrms-bar {
          flex: 1;
          min-width: 4px;
          border-radius: 4px 4px 0 0;
        }

        .hrms-day-label {
          color: #929caf;
          font-size: 10px;
          padding-bottom: 8px;
        }

        .hrms-progress-row { margin: 22px 0; }

        .hrms-progress-label {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
          font-size: 12px;
        }

        .hrms-progress-label span:last-child {
          color: #7f8a9d;
        }

        .hrms-progress-track {
          height: 7px;
          border-radius: 10px;
          background: #eef0f5;
          overflow: hidden;
        }

        .hrms-progress-fill {
          height: 100%;
          border-radius: 10px;
        }

        .hrms-activity {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 15px 0;
          border-bottom: 1px solid #f0f2f6;
        }

        .hrms-activity:last-child { border-bottom: 0; }

        .hrms-activity-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 10px;
          font-size: 19px;
        }

        .hrms-activity-copy { flex: 1; min-width: 0; }

        .hrms-activity-copy strong {
          font-size: 12px;
          display: block;
          margin: 2px 0 5px;
        }

        .hrms-activity-copy p {
          font-size: 11px;
          color: #8b95a7;
          margin: 0;
        }

        .hrms-activity time {
          color: #9aa3b3;
          font-size: 10px;
          white-space: nowrap;
          padding-top: 3px;
        }

        .hrms-table-wrap { overflow-x: auto; }

        .hrms-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .hrms-table th {
          padding: 13px 12px;
          color: #909aad;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .5px;
          font-weight: 700;
          background: #f8f9fc;
        }

        .hrms-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f0f2f6;
          font-size: 12px;
          color: #667188;
        }

        .hrms-table tr:last-child td { border-bottom: 0; }

        .hrms-person {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hrms-person-avatar {
          display: grid;
          place-items: center;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          font-size: 11px;
          font-weight: 750;
          color: #435cf5;
        }

        .hrms-person strong {
          display: block;
          color: #253047;
          font-size: 12px;
        }

        .hrms-person small {
          display: block;
          margin-top: 4px;
          color: #939caf;
          font-size: 10px;
        }

        .hrms-status {
          display: inline-block;
          padding: 6px 9px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
        }

        .hrms-status.pending { color: #b7770d; background: #fff3db; }
        .hrms-status.approved { color: #16845a; background: #e1f8ed; }

        .hrms-table-actions { display: flex; gap: 7px; }

        .hrms-small-btn {
          border: 1px solid #e6eaf1;
          background: white;
          color: #667188;
          border-radius: 6px;
          padding: 6px 9px;
          font-size: 11px;
        }

        .hrms-small-btn.approve {
          background: #435cf5;
          border-color: #435cf5;
          color: white;
        }

        .hrms-empty {
          color: #8a94a7;
          padding: 20px 0;
          font-size: 13px;
        }

        @media (max-width: 1150px) {
          .hrms-sidebar { width: 210px; }
          .hrms-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .hrms-content { padding: 24px; }
          .hrms-topbar { padding: 0 24px; }
          .hrms-middle { grid-template-columns: minmax(0, 1.2fr) minmax(260px, 1fr); }
        }

        @media (max-width: 850px) {
          .hrms-sidebar { width: 75px; padding: 22px 9px; }
          .hrms-brand { padding: 0; justify-content: center; }
          .hrms-brand-copy, .hrms-section-label,
          .hrms-nav-label, .hrms-help, .hrms-sidebar-bottom small {
            display: none;
          }
          .hrms-nav { justify-content: center; padding: 13px 5px; }
          .hrms-nav-icon { font-size: 21px; }
          .hrms-middle { grid-template-columns: 1fr; }
          .hrms-topbar { padding: 0 17px; }
          .hrms-content { padding: 22px 17px; }
        }

        @media (max-width: 560px) {
          .hrms-sidebar { width: 57px; padding: 16px 5px; }
          .hrms-brand-icon { width: 36px; height: 36px; font-size: 19px; }
          .hrms-topbar { height: 67px; gap: 8px; }
          .hrms-search { width: 100%; padding: 9px; }
          .hrms-top-actions { gap: 9px; }
          .hrms-profile-copy, .hrms-profile .hrms-chevron { display: none; }
          .hrms-profile .hrms-avatar { width: 33px; height: 33px; }
          .hrms-page-heading { align-items: flex-start; flex-direction: column; }
          .hrms-page-heading h1 { font-size: 23px; }
          .hrms-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
          .hrms-stat { padding: 14px; }
          .hrms-stat-title { font-size: 11px; }
          .hrms-stat-icon { width: 34px; height: 34px; font-size: 18px; }
          .hrms-stat-value { font-size: 24px; }
          .hrms-panel { padding: 15px; }
          .hrms-chart { gap: 5px; }
          .hrms-bars { gap: 2px; }
        }
      `}</style>

      <div className="hrms-shell">
        <aside className="hrms-sidebar">
          <div className="hrms-brand">
            <div className="hrms-brand-icon">H</div>
            <div className="hrms-brand-copy">
              <h2>HRMS<span style={{ color: "#435cf5" }}>.</span></h2>
              <small>Human Resource System</small>
            </div>
          </div>

          <div className="hrms-section-label">MAIN MENU</div>

          <nav className="hrms-menu">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `hrms-nav ${isActive ? "active" : ""}`
                }
              >
                <span className="hrms-nav-icon">{item.icon}</span>
                <span className="hrms-nav-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="hrms-sidebar-bottom">
            <div className="hrms-section-label">PREFERENCES</div>
            <NavLink to="/settings" className="hrms-nav">
              <span className="hrms-nav-icon">⚙</span>
              <span className="hrms-nav-label">Settings</span>
            </NavLink>

            <div className="hrms-help">
              <strong>Need some help?</strong>
              <p>Contact your administrator for assistance with HRMS.</p>
              <button onClick={() => window.location.href = "mailto:support@example.com"}>
                Get Support
              </button>
            </div>
          </div>
        </aside>

        <main className="hrms-main">
          <header className="hrms-topbar">
            <label className="hrms-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search anything..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <div className="hrms-top-actions">
              <button
                className="hrms-icon-btn"
                aria-label="Notifications"
                onClick={() => window.alert("Notifications will be connected later.")}
              >
                ♧<span className="hrms-notification-dot" />
              </button>

              <div className="hrms-profile">
                <div className="hrms-avatar">AD</div>
                <div className="hrms-profile-copy">
                  <strong>Admin User</strong>
                  <small>Administrator</small>
                </div>
                <span className="hrms-chevron">⌄</span>
              </div>
            </div>
          </header>

          <div className="hrms-content">
            <div className="hrms-page-heading">
              <div>
                <h1>Dashboard Overview</h1>
                <p>Welcome back! Here's what's happening in your organization.</p>
              </div>

              <button
                className="hrms-primary-btn"
                onClick={() => window.alert("Connect this button to your employee creation page.")}
              >
                <span>＋</span> Add Employee
              </button>
            </div>

            <section className="hrms-stats">
              {stats.map((stat) => (
                <article className="hrms-card hrms-stat" key={stat.title}>
                  <div className="hrms-stat-top">
                    <span className="hrms-stat-title">{stat.title}</span>
                    <span
                      className="hrms-stat-icon"
                      style={{
                        background: stat.color,
                        color: stat.iconColor,
                      }}
                    >
                      {stat.icon}
                    </span>
                  </div>
                  <div className="hrms-stat-value">{stat.value}</div>
                  <div className="hrms-stat-change">
                    <span>↗ </span>{stat.change}
                  </div>
                </article>
              ))}
            </section>

            <section className="hrms-middle">
              <article className="hrms-card hrms-panel">
                <div className="hrms-panel-heading">
                  <div>
                    <h3>Task Overview</h3>
                    <p>Weekly task completion summary</p>
                  </div>
                  <select className="hrms-select" defaultValue="week">
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                  </select>
                </div>

                <div className="hrms-legend">
                  <span><i className="hrms-dot" style={{ background: "#435cf5" }} /> Completed</span>
                  <span><i className="hrms-dot" style={{ background: "#bfcaff" }} /> Pending</span>
                </div>

                <div className="hrms-chart">
                  {chartData.map((day) => (
                    <div className="hrms-chart-day" key={day.day}>
                      <div className="hrms-bars">
                        <div
                          className="hrms-bar"
                          title={`Completed: ${day.completed}%`}
                          style={{
                            height: `${day.completed}%`,
                            background: "#435cf5",
                          }}
                        />
                        <div
                          className="hrms-bar"
                          title={`Pending: ${day.pending}%`}
                          style={{
                            height: `${day.pending}%`,
                            background: "#bfcaff",
                          }}
                        />
                      </div>
                      <span className="hrms-day-label">{day.day}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="hrms-card hrms-panel">
                <div className="hrms-panel-heading">
                  <div>
                    <h3>Project Progress</h3>
                    <p>Current project status</p>
                  </div>
                </div>

                {[
                  { label: "Website Redesign", value: 80, color: "#435cf5" },
                  { label: "HRMS Development", value: 65, color: "#18a875" },
                  { label: "Mobile Application", value: 45, color: "#e9a23b" },
                  { label: "API Integration", value: 90, color: "#9560df" },
                ].map((project) => (
                  <div className="hrms-progress-row" key={project.label}>
                    <div className="hrms-progress-label">
                      <span>{project.label}</span>
                      <span>{project.value}%</span>
                    </div>
                    <div className="hrms-progress-track">
                      <div
                        className="hrms-progress-fill"
                        style={{
                          width: `${project.value}%`,
                          background: project.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </article>
            </section>

            <section className="hrms-middle">
              <article className="hrms-card hrms-panel">
                <div className="hrms-panel-heading">
                  <div>
                    <h3>Leave Requests</h3>
                    <p>Recent requests awaiting review</p>
                  </div>
                  <NavLink
                    to="/leaves"
                    style={{
                      color: "#435cf5",
                      fontSize: 12,
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    View all →
                  </NavLink>
                </div>

                <div className="hrms-table-wrap">
                  <table className="hrms-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>Dates</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveRequests.map((leave) => (
                        <tr key={leave.initials}>
                          <td>
                            <div className="hrms-person">
                              <div
                                className="hrms-person-avatar"
                                style={{ background: leave.color }}
                              >
                                {leave.initials}
                              </div>
                              <div>
                                <strong>{leave.name}</strong>
                                <small>{leave.department}</small>
                              </div>
                            </div>
                          </td>
                          <td>{leave.type}</td>
                          <td>{leave.dates}</td>
                          <td>
                            <span className="hrms-status pending">Pending</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article className="hrms-card hrms-panel">
                <div className="hrms-panel-heading">
                  <div>
                    <h3>Recent Activities</h3>
                    <p>Latest updates in your workspace</p>
                  </div>
                </div>

                {activities.map((activity) => (
                  <div className="hrms-activity" key={activity.title}>
                    <div
                      className="hrms-activity-icon"
                      style={{ background: activity.color }}
                    >
                      {activity.icon}
                    </div>
                    <div className="hrms-activity-copy">
                      <strong>{activity.title}</strong>
                      <p>{activity.detail}</p>
                    </div>
                    <time>{activity.time}</time>
                  </div>
                ))}
              </article>
            </section>

            <p style={{
              textAlign: "center",
              color: "#9aa3b3",
              fontSize: 11,
              padding: "12px 0",
            }}>
              HRMS Admin Panel · Dashboard preview
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
