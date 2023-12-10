import React from "react";
import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import Home from "@/app/home";
//import LocalAuthProvider from "@/components/contexts/auth-context";

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
