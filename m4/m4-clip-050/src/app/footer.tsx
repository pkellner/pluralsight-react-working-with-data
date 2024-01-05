"use client";
import React from "react";

const Footer = () => {

  return (
    <footer className="header-footer-gradient home-rounded-corners-bottom-right">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Silicon Valley Code Camp</h5>
            <p>
              An event for developers to learn, connect, and explore the latest
              in tech and software development.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">
              Keep up to date on social media
            </h5>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Follow Us</h5>
            <a
              href="#"
              className="btn btn-outline-dark btn-floating m-1 social-icon facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-dark btn-floating m-1 social-icon twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-dark btn-floating m-1 social-icon instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-dark btn-floating m-1 social-icon linkedin"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center p-3 copyright-background speaker-rounded-corners">
        © 2023 Silicon Valley Code Camp
      </div>
    </footer>
  );
};

export default Footer;
