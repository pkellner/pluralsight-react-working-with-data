"use client";

export default function Header() {
  return (
    <div className="hero py-4 mt-2 header-footer-gradient home-rounded-corners-top-left">
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center justify-content-between">
          {/* Logo Section */}
          <div className="col-lg-6 text-lg-end">
            <img src="/images/svcc-logo.png" alt="SVCC Logo" />
            <h2>
              <span className="text-black">Silicon Valley Code Camp 2019</span>
            </h2>
          </div>
          <div className="col-lg-6 text-lg-start mt-3 mt-lg-0">
            <h5 className="text-uppercase text-black">October 19-20, 2019</h5>
            <h6 className="text-uppercase text-black-50">
              San Jose, California
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
