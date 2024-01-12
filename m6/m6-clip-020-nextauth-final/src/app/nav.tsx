import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

enum NavRoutes {
  Home = "/",
  Speakers = "/speakers",
}

export default function Nav() {
  const [activeNav, setActiveNav] = useState<NavRoutes>(NavRoutes.Home);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const { data: session } = useSession();

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
        <div className="d-flex justify-content-between w-100">
          <ul className="navbar-nav">
            <li
              className={`nav-item ${
                activeNav === NavRoutes.Speakers ? "active" : ""
              }`}
            >
              <a
                className="nav-link"
                href={NavRoutes.Speakers}
                onClick={() => handleNavClick(NavRoutes.Speakers)}
              >
                Speakers
              </a>
            </li>
          </ul>
          <div>
            {session?.user ? (
              <a
                className="nav-link"
                href="/api/auth/signout"
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                <b>Logout:</b> {session?.user.email}
              </a>
            ) : (
              <a
                className="nav-link"
                href="/api/auth/signin"
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                <b>Login </b>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
