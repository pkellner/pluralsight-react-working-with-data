
export default function Header() {
  return (
    <div className="hero py-4 mt-2 header-footer-gradient home-rounded-corners-top-left">
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center justify-content-between">
          <div className="col-lg-6 logo justify-content-center justify-content-lg-end">
            <div>
              <img src="/images/svcc-logo.png" alt="SVCC Logo" />
            </div>
            <h2>
              <a
                href="https://www.siliconvalley-codecamp.com/Event/2019"
                target="_blank"
              >
                <span className="text-black">Silicon Valley Code Camp 2019</span>
              </a>
            </h2>
          </div>
          <div className="col-lg-6 date-meta text-center text-lg-start mt-3 mt-lg-0">
            <h5 className="text-uppercase text-black">October 19-20, 2019</h5>
            <h6 className="text-uppercase text-black-50">San Jose, California</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
