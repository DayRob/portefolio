import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Portefolio – Côme VILLEROY de GALHAU",
  description:
    "Portefolio de Côme VILLEROY de GALHAU, étudiant ingénieur cybersécurité à CPE Lyon, spécialisé en audit, tests d’intrusion et protection des systèmes."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <ThemeProvider>
          <SiteHeader />
          <main className="section-container py-10 lg:py-12">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
