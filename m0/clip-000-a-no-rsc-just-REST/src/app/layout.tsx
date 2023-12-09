import React from "react";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/site.css";
import "/styles/fontawesome/css/all.css";
import "/styles/roboto/roboto.css";
import LocalAuthProvider from "@/components/contexts/auth-context";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "React with Data",
  description: "Demo App for the Peter Kellner React with Data Course",
};

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("authToken"); // Find cookie

  return (
    <html lang="en">
    <body>
    <LocalAuthProvider loginNameInit={token?.value}>
      <div className="container-fluid">{children}</div>
    </LocalAuthProvider>
    </body>
    </html>
  );
}
