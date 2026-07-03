import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload requires these output settings for Railway deployment
  output: "standalone",
};

export default withPayload(nextConfig, {
  // Payload config path
  configPath: "./src/payload.config.ts",
});
