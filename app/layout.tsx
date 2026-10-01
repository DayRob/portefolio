import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import "../styles/globals.css";

// Polices IBM Plex hébergées localement (licence SIL OFL, voir app/fonts/LICENSE-OFL.txt).
// Aucune requête vers un CDN ou un service de polices tiers.
const sans = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" }
  ],
  variable: "--font-sans",
  display: "swap"
});

const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" }
  ],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Côme VILLEROY de GALHAU, ingénieur cybersécurité",
    template: "%s | Côme VILLEROY de GALHAU"
  },
  description:
    "Ingénieur cybersécurité diplômé de CPE Lyon, à la recherche d'un poste technique : pentest ou conception d'infrastructure sécurisée.",
  authors: [{ name: "Côme VILLEROY de GALHAU" }],
  referrer: "no-referrer"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu principal
        </a>
        <SiteHeader />
        <main id="contenu" tabIndex={-1} className="container-page pt-10 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
