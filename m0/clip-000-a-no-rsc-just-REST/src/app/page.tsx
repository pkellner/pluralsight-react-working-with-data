import React from "react";
import { ThemeProvider } from "@/components/contexts/theme-context";
import Header from "@/components/header";
import Nav from "@/app/nav";
import Footer from "@/components/footer";
import Home from "@/components/home";

export default function Page() {
  return (
    <div className="container-fluid">
      <Header />

      <div className="full-page-border">
        <Nav />
        <Home />
      </div>
      <Footer />
    </div>
  );
}
