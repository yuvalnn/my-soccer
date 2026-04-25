import type { NextConfig } from "next";

const repoName = "my-soccer";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
  },
};

export default nextConfig;
