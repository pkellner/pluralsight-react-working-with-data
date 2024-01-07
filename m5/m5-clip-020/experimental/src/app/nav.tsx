"use client";
import React, { useState } from "react";

enum NavRoutes {
  Home = "/",
  SpeakersWithLoadingStatus = "/speakers-with-loading-status",
  SpeakersWithSuspense = "/speakers-with-suspense",
}

export default function Nav() {
  const [activeNav, setActiveNav] = useState<NavRoutes>(NavRoutes.Home);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavClick = (navItem: NavRoutes) => {
    setActiveNav(navItem);
    setIsNavCollapsed(true); // Collapse the menu after a selection
  };

  const handleToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3">
      <a className="navbar-brand" href={NavRoutes.Home}>
        <img
          src="/images/svcc-logo.png"
          alt="SVCC"
          height={25}
          className="d-inline-block align-top"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleToggle}
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-item ${
              activeNav === NavRoutes.SpeakersWithLoadingStatus ? "active" : ""
            }`}
          >
            <a
              className="nav-link"
              href={NavRoutes.SpeakersWithLoadingStatus}
              onClick={() =>
                handleNavClick(NavRoutes.SpeakersWithLoadingStatus)
              }
            >
              Speakers With Loading Status
            </a>
          </li>
          <li
            className={`nav-item ${
              activeNav == NavRoutes.SpeakersWithSuspense ? "active" : ""
            }
          }`}
          >
            <a
              className="nav-link"
              href={NavRoutes.SpeakersWithSuspense}
              onClick={() => handleNavClick(NavRoutes.SpeakersWithSuspense)}
            >
              Speakers With Suspense
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
