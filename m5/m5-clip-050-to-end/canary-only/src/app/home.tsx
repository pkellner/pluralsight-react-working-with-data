"use client";
export default function Home() {
  return (
    <div className="container d-flex justify-content-center">
      <div className="p-3">
        <img
          src={"/images/code-camp-lunch.jpg"}
          alt="Home Page"
          className="home-rounded-corners img-fluid"
        />
      </div>
    </div>
  );
}

/*
<div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <ErrorBoundary fallback={<div>Error Retrieving Speakers Data</div>}>
          <Suspense fallback={<div>Loading......</div>}>
            <SpeakerList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>

 */
