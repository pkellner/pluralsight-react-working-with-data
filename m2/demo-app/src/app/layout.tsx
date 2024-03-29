import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "/styles/site.css";

export const metadata = {
  title: "Demo App",
  description: "Generated by Peter Kellner",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
