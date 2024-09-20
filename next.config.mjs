/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    middleware: [
        {
            path: "/api/direccionamiento",
            middleware:  "/src/middleware/middleware.js",
        }
    ]
};

export default nextConfig;
