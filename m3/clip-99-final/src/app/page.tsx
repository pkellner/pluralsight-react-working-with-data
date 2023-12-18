import React from "react";
import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import Home from "@/app/home";

export default function Page() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <Home />
      </div>
      <Footer />
    </div>
  );
}

// "use client";
// import { useState } from "react";
//
// export default function Home() {
//   const [counter, setCounter] = useState(100);
//   return (
//     <div>
//       <h1>Hello From Pluralsight!</h1>
//       <h1>
//         <button onClick={() => setCounter(counter + 1)}>{counter}</button>
//       </h1>
//     </div>
//   );
// }
