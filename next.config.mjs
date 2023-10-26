/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@trigger.dev/react'],
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'avviixmncfmrzwojclje.supabase.co'],
  },
}

export default nextConfig
