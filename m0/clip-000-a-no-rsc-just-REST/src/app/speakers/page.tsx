"use client";
export default function Home() {
  // return a home page that shows a nice jumbo image
  // and some text about the site
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <img
            src={"/images/code-camp-lunch.jpg"}
            alt="Home Page"
            className="img-fluid"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h2>Welcome to Silicon Valley Code Camp</h2>
          <p>
            Silicon Valley Code Camp is a community event where developers learn
            from fellow developers. We also have developer related topics that
            include software branding, legal issues around software as well as
            other topics developers are interested in hearing about.
          </p>
        </div>
      </div>
    </div>
  );
}
