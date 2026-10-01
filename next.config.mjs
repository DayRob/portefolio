/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100 % statique : pas de runtime Node, donc pas de surface d'attaque serveur.
  // Les en-têtes de sécurité sont posés par nginx (voir deploy/ et README.md).
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true }
};

export default nextConfig;
