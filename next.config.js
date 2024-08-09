/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.tailgrids.com',
      'img.clerk.com',
      'http://www.w3.org/2000/svg',
      'http://localhost:3000/',
      'pinnaclepartnerships.com',
      'admin.pinnaclepartnerships.com',
    ], // Add external domains here if needed in the future
    deviceSizes: [640, 768, 1024, 1280, 1600], // Optional: Customize to the sizes you need for responsive images
    imageSizes: [16, 32, 48, 64, 96], // Optional: Specify additional fixed sizes for image srcsets
  },
  // Further customizations can go here
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'own-l7',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
