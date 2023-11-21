/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['res.cloudinary.com','lh3.googleusercontent.com','randomuser.me'],
    },
    experimental:{
        reactRoot: true,
        suppressHydrationWarning: true,
    }
}

module.exports = nextConfig
