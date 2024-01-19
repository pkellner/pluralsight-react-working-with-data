"use client";
import Footer from "@/app/footer";
import Nav from "@/app/nav";
import Header from "@/app/header";
import React from "react";
import Home from "@/app/home";
import NextAuthProvider from "@/contexts/next-auth-provider";

export default function HomePage() {
  return (
    <div className="container-fluid">
      <NextAuthProvider>
        <Header />
        <div className="full-page-border app-content-background">
          <Nav />
          <Home />
        </div>
        <Footer />
      </NextAuthProvider>
    </div>
  );
}
