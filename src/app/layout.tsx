import type { Metadata } from "next";
import '../../globals.css'
import SideNav from "./ui/navigation/sidenav";

export const metadata: Metadata = {
  title: "Wordoise",
  description: "Like wordle but wayyyy cooler",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <SideNav />
          <div className="bg-gradient-to-b from-black to-emerald-950 grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
