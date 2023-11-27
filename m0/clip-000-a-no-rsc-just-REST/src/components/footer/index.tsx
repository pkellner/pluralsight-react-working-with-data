'use client';
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Silicon Valley Code Camp</h5>
            <p>
              Silicon Valley Code Camp is a community event where developers learn from fellow developers.
              We also have developer related topics that include software branding, legal issues around software as well
              as other topics developers are interested in hearing about.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">About Us</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Contact</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">Twitter</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Facebook</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        © 2023 Silicon Valley Code Camp
      </div>
    </footer>
  );
}

