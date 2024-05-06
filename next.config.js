/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com', 'http://www.w3.org/2000/svg'], // Add external domains here if needed in the future
    deviceSizes: [640, 768, 1024, 1280, 1600], // Optional: Customize to the sizes you need for responsive images
    imageSizes: [16, 32, 48, 64, 96], // Optional: Specify additional fixed sizes for image srcsets
  },
  // Further customizations can go here
};

module.exports = nextConfig;
